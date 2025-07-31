import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: true, 
  });

  return response;
}
