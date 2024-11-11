import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('BODY:', body);
  const url = request.url;
  console.log('URL:', url);

  return NextResponse.json({ message: 'Hello World' });
}
