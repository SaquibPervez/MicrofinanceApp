import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import User from '@/server/models/user';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
    }

    user.status = 'Verified';
    user.otp = ''; 
    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

   
  const response = NextResponse.json({ message: 'Verification successful', token });
response.cookies.set('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
});
return response;

    return NextResponse.json(
      { message: 'Verification successful', token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
