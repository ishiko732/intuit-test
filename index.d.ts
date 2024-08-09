declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      readonly clientId: string;
      readonly clientSecret: string;
      readonly redirectUri: string;
      readonly environment: string;
    }
  }
}
