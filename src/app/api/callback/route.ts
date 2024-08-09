import IntuitSDK from '@/lib/sdk';
import { Config } from '@/lib/sdk/config';
import { IntuitTokenType } from '@/lib/sdk/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const mid = url.searchParams.get('realmId') ?? undefined;
  const state = url.searchParams.get('state') ?? undefined;
  const sdk = new IntuitSDK(Config);
  console.log(code, mid, state);
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }
  const resp = await sdk.token({ code, type: IntuitTokenType.code });
  console.log(resp);
  return NextResponse.redirect(
    new URL(
      `/api/userinfo?refresh_token=${resp.refresh_token}&access_token=${resp.access_token}&realmId=${mid}&state=${state}`,
      url.href
    )
  );
}
