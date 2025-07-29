import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/mongoose';
import loanRequest from '@/server/models/loanRequest';

export async function POST(req) {
  
  try {
    await dbConnect();

   const {
  category,
  subcategory,
  initialDeposit,
  loanAmount,
  loanPeriod,
  monthlyPayment,
  userId,
  tokenNumber,
  appointmentDetails, 
} = await req.json();


    if (!category || !subcategory || !initialDeposit || !loanAmount || !loanPeriod || !monthlyPayment || !userId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

  const newLoanRequest = new loanRequest({
  category,
  subcategory,
  initialDeposit,
  loanAmount,
  loanPeriod,
  monthlyPayment, 
  userId, 
  tokenNumber,
  appointmentDetails: appointmentDetails || {
        date: null,
        time: null,
        officeLocation: null
      }
});

    const savedLoan = await newLoanRequest.save();
   console.log(savedLoan, "saved Loan")
    return NextResponse.json(
      { message: 'Loan request saved', data: savedLoan },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving loan request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}