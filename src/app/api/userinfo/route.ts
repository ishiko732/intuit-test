import IntuitSDK from '@/lib/sdk';
import { Config } from '@/lib/sdk/config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get('access_token') ?? undefined;
  const sdk = new IntuitSDK(Config);
  if (!token) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }
  sdk.setAccessToken(token);
  const resp = await sdk.userinfo();
  return NextResponse.json(resp);
}
