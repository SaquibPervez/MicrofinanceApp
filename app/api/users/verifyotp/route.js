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
      return NextResponse.json({ error: 'Invalid OTP or user not found' }, { status: 401 });
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
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      { message: 'Verification successful', token },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
