/// <reference types="vite/client" />

// Declare CSS modules with ?inline suffix
declare module "*.css?inline" {
  const content: string;
  export default content;
}
