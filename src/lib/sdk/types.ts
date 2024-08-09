export type IntuitEnvironment = 'sandbox' | 'production';

export type IntuitSDKConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  environment: IntuitEnvironment;
};

export enum IntuitScope {
  Accounting = 'com.intuit.quickbooks.accounting',
  Payment = 'com.intuit.quickbooks.payment',
  // Payroll = 'com.intuit.quickbooks.payroll',
  Openid = 'openid',
  Email = 'email',
  Phone = 'phone',
  Profile = 'profile',
}

export type IntuitAuthRequest = {
  state: string | object;
  scope: IntuitScope[];
  realmid?: string;
};

export type IntuitAuthCallback = {
  code: string;
  realmId: string;
  state: string;
};

export type IntuitEndpoint = {
  [key in ExcludedQueryIntuitEndpoint]: string;
} & {
  query: (realmid: string, minorversion: number) => string;
};

export enum IntuitEndpointKey {
  authorization = 'authorization',
  token = 'token',
  userinfo = 'userinfo',
  jwks = 'jwks',
  query = 'query',
  revoke = 'revoke',
}

type ExcludedQueryIntuitEndpoint = Exclude<
  IntuitEndpointKey,
  IntuitEndpointKey.query
>;

export enum IntuitTokenType {
  code,
  refresh,
}

export type IntuitTokenRequest =
  | {
      type: IntuitTokenType.code;
      code: string;
    }
  | {
      type: IntuitTokenType.refresh;
      refresh: string;
    };

export type IntuitTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  x_refresh_token_expires_in: number;
  id_token: string;
  response_time: number
};


export type IntuitUserInfo = {
  sub: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  givenName: string;
  familyMame: string;
};