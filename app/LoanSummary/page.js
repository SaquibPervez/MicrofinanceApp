'use client';
import { jwtDecode } from 'jwt-decode';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
function SummaryModal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loanData, setLoanData] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loanObject = searchParams.get('loan');
    try {
      const parsed = loanObject ? JSON.parse(decodeURIComponent(loanObject)) : null;
      setLoanData(parsed);
    } catch (error) {
      console.error('Error parsing loan data:', error);
    }

    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }, [searchParams]);

  const submitLoanReq = async () => {
    if (!loanData) return;

    try {
      const response = await fetch('/api/loan-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: loanData.loan,
          subcategory: loanData.subcategory,
          initialDeposit: loanData.deposit,
          loanAmount: loanData.amount,
          loanPeriod: loanData.period,
          monthlyPayment: loanData.monthlypay,
          userId,
          tokenNumber: '',
          appointmentDetails: {
            date: null,
            time: 'Will be set by admin',
            officeLocation: 'Will be set by admin',
          },
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(`Error: ${result.message || 'Something went wrong'}`);
        return;
      }

      alert('Loan request saved');
      router.push('/loandetail');
    } catch (error) {
      console.error('Loan request error:', error);
      alert('An error occurred while submitting your loan request.');
    }
  };

  if (!loanData) {
    return <div className="text-center mt-20 text-gray-600">Loading loan summary...</div>;
  }

  const { loan, subcategory, deposit, amount, period, monthlypay } = loanData;
  console.log(monthlypay, 'pay')
  return (

    <>
    <Suspense fallback={<div>Loading loan Summary...</div>}>
    <div className='mx-10 border mt-10'>
    <div className="bg-blue-600 px-6 py-4">
      <h2 className="text-xl font-bold text-white">Loan Application Summary</h2>
    </div>

    <div className="p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8 text-center">
          <DetailItem label="Loan Category" value={loan} />
          <DetailItem label="Subcategory" value={subcategory} />
          <DetailItem label="Initial Deposit" value={`Rs. ${deposit.toLocaleString()}`} />
          <DetailItem label="Loan Amount" value={`Rs. ${amount.toLocaleString()}`} />
          <DetailItem label="Loan Period" value={period} />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-800">Monthly Payment</span>
            <span className="text-2xl font-bold text-blue-600">
              Rs. {monthlypay.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-blue-600 mt-1">*Based on current terms</p>
        </div>

        {/* QR Code Placeholder */}
        {/* {userId && (
          <div className="flex justify-center pt-2">
          <QRCode text={userId} size={128} />
          </div>
          )} */}
      </div>

      <div className="flex justify-between mt-8 space-x-4">
        <button
          onClick={() => router.back()}
          className="flex-1 px-4 py-3 border border-gray-500 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
          Back
        </button>
        <button
          onClick={submitLoanReq}
          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
          Confirm & Proceed
        </button>
      </div>
    </div>
   </div>
   </Suspense>
          </>
);

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
}

export default SummaryModal;
