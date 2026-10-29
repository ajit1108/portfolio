const configuredBase = (import.meta.env.VITE_API_BASE_URL ?? '').trim();

/**
 * Base URL of the Spring Boot API, e.g. https://portfolio-api.onrender.com.
 * Empty string means "same origin", which is what the local Vite proxy uses.
 */
export const API_BASE = configuredBase.replace(/\/+$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
