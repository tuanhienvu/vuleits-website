/**
 * Public HTTP API path prefix. Matches `app/api/**` route segments and the frontend `API_PREFIX`.
 * CORS / middleware matchers should use the same value.
 */
export const API_PREFIX = '/api' as const;
