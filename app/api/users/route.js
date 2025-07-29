import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import User from '@/server/models/user';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, cnic, phone, address } = await req.json();

    if (!name || !email || !cnic || !phone || !address) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    await dbConnect();
    let user = await User.findOne({ email });

    const otp = crypto.randomInt(100000, 999999).toString();

    if (!user) {
      user = await User.create({ name, email, address, cnic, phone, otp, isAdmin: false });
    } else {
      user.otp = otp;
      await user.save();
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Microfinance App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Hi ${name}, your OTP is <b>${otp}</b>. Copy and paste this opt to register.</p>`,
    });

    return NextResponse.json({ message: 'OTP sent' }, { status: 201 });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
