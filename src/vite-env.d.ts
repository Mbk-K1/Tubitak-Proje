/** Vite ortamı (client importları) — `vite` paketi yüklü olmasa da tsc/IDE çözümü için */
declare module '*.css' {
  const css: string;
  export default css;
}

interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
