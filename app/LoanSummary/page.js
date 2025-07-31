'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import QRCode from '../Components/QRCode';
import { useEffect, useState } from 'react';

function SummaryModal({ show, onClose }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loanData, setLoanData] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loanObject = searchParams.get('loan');
    try {
      const parsed = loanObject ? JSON.parse(decodeURIComponent(loanObject)) : null;
      setLoanData(parsed);
      console.log(parsed,"data")
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
          monthlyPayment: loanData.monthlyPay,
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
      console.log(result, "Result")
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

  if (!show || !loanData) return null;

  const { loan, subcategory, deposit, amount, period, monthlyPay } = loanData;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 h-full">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Loan Summary</h2>
        <p><strong>Selected Category:</strong> {loan}</p>
        <p><strong>Selected Subcategory:</strong> {subcategory}</p>
        <p><strong>Initial Deposit:</strong> Rs. {deposit}</p>
        <p><strong>Loan Amount:</strong> Rs. {amount}</p>
        <p><strong>Loan Period:</strong> {period}</p>
        <h3 className="text-lg font-bold text-gray-700 mt-4">Monthly Payment:</h3>
        <p className="mb-4">Rs. {monthlyPay}</p>

        {userId && <QRCode text={userId} size={64} />}

        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={submitLoanReq}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;
