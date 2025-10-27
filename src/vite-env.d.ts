/// <reference types="vite/client" />

// Declare CSS modules with ?inline suffix
declare module "*.css?inline" {
  const content: string;
  export default content;
}

// Extend ImportMetaEnv for custom environment variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
