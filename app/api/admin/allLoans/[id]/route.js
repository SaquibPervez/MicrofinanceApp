import { NextResponse } from 'next/server'
import dbConnect from '@/server/lib/mongoose'
import LoanRequest from '@/server/models/loanRequest'

export async function PUT(request, { params }) {
  try {
    await dbConnect()
    const { id } = params
    const body = await request.json()

    const updatedLoan = await LoanRequest.findByIdAndUpdate(
      id,
      {
        status: body.status,
        appointmentDetails: body.appointmentDetails,
        tokenNumber: body.tokenNumber
      },
      { new: true }
    )

    if (!updatedLoan) {
      return NextResponse.json(
        { message: 'Loan request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Loan request updated', data: updatedLoan },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}