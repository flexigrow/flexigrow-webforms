/**
 * Application configuration
 * Uses environment variables with fallbacks
 */

export const config = {
  /**
   * Base URL for the API (without trailing slash)
   * Set via VITE_API_BASE_URL environment variable
   */
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL || "https://dev.flexigrowapi.com",
} as const;
