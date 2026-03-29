/** Narrow JSON to a string-keyed object for safe field reads (avoids `any`). */
export function jsonObjectBody(body: unknown): Record<string, unknown> {
  if (body !== null && typeof body === 'object' && !Array.isArray(body)) {
    return body as Record<string, unknown>;
  }
  return {};
}

/** `features[featureKey][actionKey]` as boolean, for permission matrices. */
export function readNestedBoolean(
  root: Record<string, unknown>,
  featureKey: string,
  actionKey: string,
): boolean {
  const node = root[featureKey];
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return false;
  const row = node as Record<string, unknown>;
  return Boolean(row[actionKey]);
}
