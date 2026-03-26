/** Ensures we never call .map on undefined when API/DB shapes differ on hosting. */
export function safeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}
