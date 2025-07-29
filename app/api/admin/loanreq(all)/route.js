import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import LoanRequest from '@/server/models/loanRequest';

export async function GET() {
  try {
    await dbConnect();
    const loans = await LoanRequest
      .find()
      .populate('userId', 'name email')
      .lean();

    return NextResponse.json(loans, { status: 200 });
  } catch (err) {
    console.error('Error fetching loans:', err);
    return NextResponse.json({ error: 'Could not fetch loans' }, { status: 500 });
  }
}
