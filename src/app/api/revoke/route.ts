import IntuitSDK from '@/lib/sdk';
import { Config } from '@/lib/sdk/config';
import { IntuitScope } from '@/lib/sdk/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const refresh_token = url.searchParams.get('refresh_token') ?? undefined;
  const token = url.searchParams.get('access_token') ?? undefined;
  const realmId = url.searchParams.get('realmId') ?? undefined;
  const sdk = new IntuitSDK(Config);
  if (!token || !refresh_token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }
  sdk.setRefreshToken(refresh_token);
  sdk.setAccessToken(token);
  console.log(realmId);
  const response = await sdk.revoke();
  return NextResponse.json({ status: response }, { status: 200 });
}
