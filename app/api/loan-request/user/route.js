import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import LoanRequest from '@/server/models/loanRequest';

export async function POST(req) {
  try {
    await dbConnect();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
    }

    const userLoans = await LoanRequest.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ data: userLoans }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user loan requests:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
