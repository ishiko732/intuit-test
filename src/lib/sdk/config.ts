import type { IntuitSDKConfig } from './types';

export const Config: IntuitSDKConfig = {
  clientId: String(process.env.clientId),
  clientSecret: String(process.env.clientSecret),
  redirectUri: String(process.env.redirectUri),
  environment: String(process.env.environment) as 'sandbox' | 'production',
};
