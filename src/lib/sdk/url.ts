import { IntuitEndpoint, IntuitEndpointKey, IntuitEnvironment } from './types';

// Ref: https://developer.api.intuit.com/.well-known/openid_sandbox_configuration
const sandBoxUrl: IntuitEndpoint = {
  authorization: 'https://appcenter.intuit.com/connect/oauth2',
  token: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
  userinfo:
    'https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo',
  jwks: 'https://oauth.platform.intuit.com/op/v1/jwks',
  query: (mid: string, minorversion: number) => {
    return `https://sandbox-quickbooks.api.intuit.com/v3/company/${mid}/query?minorversion=${minorversion}`;
  },
  revoke: 'https://developer.api.intuit.com/v2/oauth2/tokens/revoke',
} as const;

// Ref: https://developer.api.intuit.com/.well-known/openid_configuration
const productionUrl: IntuitEndpoint = {
  authorization: 'https://appcenter.intuit.com/connect/oauth2',
  token: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
  userinfo: 'https://accounts.platform.intuit.com/v1/openid_connect/userinfo',
  jwks: 'https://oauth.platform.intuit.com/op/v1/jwks',
  query: (mid: string, minorversion: number) => {
    return `https://quickbooks.api.intuit.com/v3/company/${mid}/query?minorversion=${minorversion}`;
  },
  revoke: 'https://developer.api.intuit.com/v2/oauth2/tokens/revoke',
} as const;

export default class DefaultUrl {
  constructor(private env: IntuitEnvironment) {}

  get_base_url<T extends IntuitEndpointKey>(endpoint: T){
    const url = this.env === 'sandbox' ? sandBoxUrl : productionUrl;

    return url[endpoint] as (T extends IntuitEndpointKey.query ? (mid: string, minorversion: number) => string : string)
  }
}
