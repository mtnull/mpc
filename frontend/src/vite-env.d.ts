/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BACKEND_PORT: string;
  VITE_BACKEND_HOST: string;
};

interface ImportMeta {
  readonly env: ImportMetaEnv;
};
