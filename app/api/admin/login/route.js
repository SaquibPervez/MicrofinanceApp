import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import User from '@/server/models/user';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
  }

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user || !user.isAdmin) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  const response = NextResponse.json({ message: 'Admin logged in' , token});

  return response;
}
