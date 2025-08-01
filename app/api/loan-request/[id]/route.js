import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import loanRequest from '@/server/models/loanRequest';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const loan = await loanRequest.findById(id);

    if (!loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json({ data: loan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
