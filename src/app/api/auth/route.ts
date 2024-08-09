import IntuitSDK from '@/lib/sdk';
import { Config } from '@/lib/sdk/config';
import { IntuitScope } from '@/lib/sdk/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const mid = url.searchParams.get('mid') ?? undefined;
  const callback = url.searchParams.get('callback');
  const _request = {
    state: { callback: callback },
    scope: [
      IntuitScope.Accounting,
      IntuitScope.Openid,
      IntuitScope.Email,
      IntuitScope.Phone,
      IntuitScope.Profile,
    ],
    realmid: mid,
  };
  const sdk = new IntuitSDK(Config);
  const response = sdk.auth(_request);
  return NextResponse.redirect(response);
}
