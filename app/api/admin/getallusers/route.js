import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import User from '@/server/models/user';

export async function GET() {
  try {
    await dbConnect();

     const users = await User.find({ isAdmin: false }).select('-password');

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error('Error fetching users:', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
