import {
  IntuitSDKConfig,
  IntuitAuthRequest,
  IntuitEndpointKey,
  IntuitTokenRequest,
  IntuitTokenType,
  IntuitTokenResponse,
  IntuitUserInfo,
} from './types';
import IntuitUrl from './url';

const minorversion = 14;
export default class IntuitSDK {
  private mid: string | undefined;
  private access_token: string | undefined;
  private refresh_token: string | undefined;
  private url: IntuitUrl;
  constructor(private config: IntuitSDKConfig) {
    this.config = {
      ...config,
      environment: config.environment ?? 'production',
    };
    this.url = new IntuitUrl(config.environment ?? 'production');
  }

  setMid(mid: string) {
    this.mid = mid;
  }

  setAccessToken(accessToken: string) {
    this.access_token = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refresh_token = refreshToken;
  }

  getAccessToken() {
    return this.access_token;
  }

  getRefreshToken() {
    return this.refresh_token;
  }

  private get authBase64() {
    return Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`
    ).toString('base64');
  }

  private getResponseTime(date: string | null) {
    const now = date === null ? new Date() : new Date(date);
    return now.getTime() / 1000;
  }

  auth(data: IntuitAuthRequest): string {
    const auth = this.url.get_base_url(IntuitEndpointKey.authorization);
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      scope: data.scope.join(' '),
      redirect_uri: this.config.redirectUri,
      state:
        typeof data.state === 'object'
          ? JSON.stringify(data.state)
          : data.state,
    });
    if (data.realmid) {
      params.set(
        'claims',
        JSON.stringify({
          id_token: {
            realmId: data.realmid,
          },
        })
      );
      params.set('realm_id', data.realmid);
    }
    return `${auth}?${params.toString()}`;
  }

  async token(data: IntuitTokenRequest): Promise<IntuitTokenResponse> {
    const token = this.url.get_base_url(IntuitEndpointKey.token);

    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + this.authBase64,
    };
    let body = {};
    if (data.type === IntuitTokenType.code) {
      body = {
        grant_type: 'authorization_code',
        code: data.code,
        redirect_uri: this.config.redirectUri,
      };
    } else if (data.type === IntuitTokenType.refresh) {
      body = {
        grant_type: 'refresh_token',
        refresh_token: data.refresh,
      };
    } else {
      throw new Error('Invalid token type');
    }

    const response = await fetch(token, {
      method: 'POST',
      headers: header,
      body: new URLSearchParams(body),
    });
    console.log(response.ok);

    const time = this.getResponseTime(response.headers.get('date'));
    const resp = await response.json();
    Object.assign(resp, { response_time: time });
    return resp as IntuitTokenResponse;
  }

  async userinfo(): Promise<IntuitUserInfo> {
    const userinfo = this.url.get_base_url(IntuitEndpointKey.userinfo);
    const header = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.access_token,
    };
    const response = await fetch(userinfo, {
      headers: header,
    });
    return response.json();
  }

  async revoke() {
    const revoke = this.url.get_base_url(IntuitEndpointKey.revoke);
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + this.authBase64,
      'User-Agent': 'Intuit-oauth-sdk',
    };

    console.log(revoke, this.refresh_token, header.Authorization);
    const response = await fetch(revoke, {
      method: 'POST',
      headers: header,
      body: new URLSearchParams({
        token: this.refresh_token!,
      }),
    });

    console.log('text', response.status);
    return response.ok;
  }
}
