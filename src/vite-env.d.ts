/// <reference types="vite/client" />

// Declare CSS modules with ?inline suffix
declare module "*.css?inline" {
  const content: string;
  export default content;
}

// Extend ImportMetaEnv for custom environment variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_PROD_BASE_URL: string;
  readonly VITE_API_SIGNATURE: string;
  readonly VITE_API_PROD_SIGNATURE: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
