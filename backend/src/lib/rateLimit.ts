import Redis from 'ioredis';
import { log } from '@/lib/logger';

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const url = process.env.REDIS_URL?.trim();
  if (!url) {
    redisClient = null;
    return null;
  }
  try {
    redisClient = new Redis(url, {
      maxRetriesPerRequest: 2,
      enableOfflineQueue: false,
    });
  } catch {
    redisClient = null;
  }
  return redisClient;
}

function trustForwardedHeaders(): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  const v = process.env.TRUST_FORWARDED_FOR?.trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

/**
 * Client IP for rate limiting. In production, `X-Forwarded-For` / `X-Real-IP` are used only
 * when `TRUST_FORWARDED_FOR=1` (set this behind Docker/nginx). Otherwise all clients share the
 * `unknown` bucket (still blocks unauthenticated abuse, but is coarse).
 */
export function getClientIp(request: Request): string {
  if (trustForwardedHeaders()) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      const first = forwarded.split(',')[0]?.trim();
      if (first) return first;
    }
    const realIp = request.headers.get('x-real-ip')?.trim();
    if (realIp) return realIp;
  }
  return 'unknown';
}

function checkRateLimitMemory(
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = memoryBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

async function checkRateLimitRedis(
  redis: Redis,
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const redisKey = `ratelimit:${key}`;
  const count = await redis.incr(redisKey);
  if (count === 1) {
    await redis.pexpire(redisKey, windowMs);
  }
  const ttl = await redis.pttl(redisKey);
  if (count > maxRequests) {
    const msLeft = ttl > 0 ? ttl : windowMs;
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(msLeft / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Fixed window counter. Uses Redis when `REDIS_URL` is set (recommended for Docker with
 * multiple replicas); otherwise in-process memory (single instance only).
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const redis = getRedis();
  if (redis) {
    try {
      return await checkRateLimitRedis(redis, key, maxRequests, windowMs);
    } catch (e) {
      log.warn('rate_limit.redis_fallback', {
        event: { category: 'process', action: 'rate_limit', outcome: 'degraded' },
        error: e instanceof Error ? { message: e.message, type: e.name } : { message: String(e) },
      });
    }
  }
  return checkRateLimitMemory(key, maxRequests, windowMs);
}
