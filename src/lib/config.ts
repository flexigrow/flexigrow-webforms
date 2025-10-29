/**
 * Application configuration
 * Uses environment variables with fallbacks
 */

/**
 * Get the API base URL based on the current environment
 * - Development: Uses VITE_API_BASE_URL
 * - Production: Uses VITE_API_PROD_BASE_URL
 */
const getApiBaseUrl = () => {
  const isDev = import.meta.env.MODE === "development";

  if (isDev) {
    return import.meta.env.VITE_API_BASE_URL || "https://dev.flexigrowapi.com";
  }

  return (
    import.meta.env.VITE_API_PROD_BASE_URL || "https://uat.flexigrowapi.com"
  );
};

/**
 * Get the API signature based on the current environment
 * - Development: Uses VITE_API_SIGNATURE
 * - Production: Uses VITE_API_PROD_SIGNATURE
 */
const getApiSignature = () => {
  const isDev = import.meta.env.MODE === "development";

  if (isDev) {
    return import.meta.env.VITE_API_SIGNATURE || "";
  }

  return import.meta.env.VITE_API_PROD_SIGNATURE || "";
};

export const config = {
  /**
   * Base URL for the API (without trailing slash)
   * - Dev: Set via VITE_API_BASE_URL environment variable
   * - Prod: Set via VITE_API_PROD_BASE_URL environment variable
   */
  apiBaseUrl: getApiBaseUrl(),

  /**
   * API signature for request authentication
   * - Dev: Set via VITE_API_SIGNATURE environment variable
   * - Prod: Set via VITE_API_PROD_SIGNATURE environment variable
   */
  apiSignature: getApiSignature(),
} as const;
