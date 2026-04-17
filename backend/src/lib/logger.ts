/**
 * Structured logging aligned with common operational standards:
 * - Timestamps: ISO 8601 (`@timestamp`)
 * - Severity: RFC 5424 syslog levels (0–7) in `log.syslog.severity.code`
 * - Format: JSON lines (default in production) for ELK / CloudWatch / Loki
 * - Fields: ECS-inspired (`log.level`, `service.name`, `trace.id`, `error.*`)
 *
 * Env: `LOG_LEVEL` = debug | info | warn | error (default: info in production, debug in dev)
 *      `LOG_FORMAT` = json | pretty (default: json in production, pretty in dev)
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/** RFC 5424 syslog severity codes (0 = emergency … 7 = debug). */
const SYSLOG_CODE: Record<LogLevel, number> = {
  error: 3,
  warn: 4,
  info: 6,
  debug: 7,
};

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const SERVICE_NAME = 'vuleits-backend';
const SERVICE_VERSION = process.env.SERVICE_VERSION?.trim() || process.env.npm_package_version || '0.1.0';

function envLogLevel(): LogLevel {
  const raw = process.env.LOG_LEVEL?.trim().toLowerCase();
  if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') return raw;
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

function envFormat(): 'json' | 'pretty' {
  const raw = process.env.LOG_FORMAT?.trim().toLowerCase();
  if (raw === 'json' || raw === 'pretty') return raw;
  return process.env.NODE_ENV === 'production' ? 'json' : 'pretty';
}

function shouldEmit(level: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[envLogLevel()];
}

const REDACT_KEYS = /password|secret|token|authorization|cookie|set-cookie|jwt/i;

function redactValue(key: string, value: unknown): unknown {
  if (REDACT_KEYS.test(key)) return '[REDACTED]';
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return redactDeep(value as Record<string, unknown>);
  }
  return value;
}

function redactDeep(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (REDACT_KEYS.test(k)) {
      out[k] = '[REDACTED]';
    } else if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = redactDeep(v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function serializeError(err: unknown): { type?: string; message: string; stack?: string } {
  if (err instanceof Error) {
    return { type: err.name, message: err.message, stack: err.stack };
  }
  return { message: String(err) };
}

export type LogFields = Record<string, unknown>;

function emitRecord(
  level: LogLevel,
  message: string,
  fields: LogFields | undefined,
): void {
  if (!shouldEmit(level)) return;

  const safe = fields ? redactDeep(fields as Record<string, unknown>) : undefined;
  const record: Record<string, unknown> = {
    '@timestamp': new Date().toISOString(),
    message,
    log: {
      level,
      logger: SERVICE_NAME,
      syslog: { severity: { code: SYSLOG_CODE[level] } },
    },
    service: {
      name: SERVICE_NAME,
      version: SERVICE_VERSION,
    },
    ...(safe && Object.keys(safe).length > 0 ? safe : {}),
  };

  const fmt = envFormat();
  if (fmt === 'pretty') {
    const ts = record['@timestamp'];
    const line = `[${ts}] ${level.toUpperCase()} ${message}${safe ? ` ${JSON.stringify(safe)}` : ''}`;
    if (level === 'error') console.error(line);
    else if (level === 'warn') console.warn(line);
    else console.log(line);
    return;
  }

  const line = JSON.stringify(record);
  if (level === 'error') console.error(line);
  else console.log(line);
}

export const log = {
  debug: (message: string, fields?: LogFields) => emitRecord('debug', message, fields),
  info: (message: string, fields?: LogFields) => emitRecord('info', message, fields),
  warn: (message: string, fields?: LogFields) => emitRecord('warn', message, fields),
  error: (message: string, fields?: LogFields) => emitRecord('error', message, fields),

  /** Log an Error with optional extra ECS-style `error.*` fields. */
  exception: (message: string, err: unknown, fields?: LogFields) => {
    const errObj = serializeError(err);
    emitRecord('error', message, {
      ...fields,
      error: {
        message: errObj.message,
        ...(errObj.type ? { type: errObj.type } : {}),
        ...(errObj.stack ? { stack_trace: errObj.stack } : {}),
      },
    });
  },
};

export function createRequestLogger(request: Request) {
  const traceId =
    request.headers.get('x-request-id')?.trim() ||
    request.headers.get('x-correlation-id')?.trim() ||
    undefined;

  const base = (): LogFields =>
    traceId
      ? {
          trace: { id: traceId },
          'http.request.id': traceId,
        }
      : {};

  return {
    debug: (message: string, fields?: LogFields) => log.debug(message, { ...base(), ...fields }),
    info: (message: string, fields?: LogFields) => log.info(message, { ...base(), ...fields }),
    warn: (message: string, fields?: LogFields) => log.warn(message, { ...base(), ...fields }),
    error: (message: string, fields?: LogFields) => log.error(message, { ...base(), ...fields }),
    exception: (message: string, err: unknown, fields?: LogFields) =>
      log.exception(message, err, { ...base(), ...fields }),
  };
}
