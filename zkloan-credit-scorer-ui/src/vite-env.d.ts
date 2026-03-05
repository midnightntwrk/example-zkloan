/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK_ID: string;
  readonly VITE_LOGGING_LEVEL: string;
  readonly VITE_ATTESTATION_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
