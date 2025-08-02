'use client';
import { jwtDecode } from 'jwt-decode';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState, Suspense } from 'react';
import { Toaster, toast } from 'sonner';

export const dynamic = 'force-dynamic';

function SummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loanData, setLoanData] = useState(null);
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const loanObject = searchParams.get('loan');

    // Parse loan data from query
    try {
      const parsed = loanObject ? JSON.parse(decodeURIComponent(loanObject)) : null;
      setLoanData(parsed);
    } catch (error) {
      console.error('Error parsing loan data:', error);
      toast.error('Invalid loan data format');
      setTimeout(() => router.push('/dashboard'), 1500);
      return;
    }

    async function fetchToken() {
      try {
        const res = await fetch('/api/users/me');
        const data = await res.json();
        const token = data.token;

        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.userId);
        } else {
          toast.error('Please login to continue');
          router.push('/Login');
        }
      } catch (err) {
        console.error('Token fetch failed:', err);
        toast.error('Session expired. Please login again.');
        router.push('/Login');
      }
    }

    fetchToken();
  }, [searchParams, router]);

  const submitLoanReq = async () => {
    if (!loanData) {
      toast.error('No loan data found');
      return;
    }
    
    setIsSubmitting(true);

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
        throw new Error(result.message || 'Failed to submit loan request');
      }

      toast.success('Loan request submitted successfully!');
      setTimeout(() => router.push('/loandetail'), 1500);
    } catch (error) {
      console.error('Loan request error:', error);
      toast.error(error.message || 'Failed to submit loan request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loanData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Toaster position="top-center" richColors closeButton />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading loan summary...</p>
        </div>
      </div>
    );
  }

  const { loan, subcategory, deposit, amount, period, monthlypay } = loanData;

  return (
    <div className='mx-4 md:mx-10 border my-10'>
      <Toaster position="top-center" richColors closeButton />
      
      <div className="bg-blue-600 px-6 py-4 mt-5">
        <h2 className="text-xl font-bold text-white">Loan Application Summary</h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-center">
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
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-8 gap-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-3 border border-gray-500 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={submitLoanReq}
            disabled={isSubmitting}
            className={`px-4 py-3 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg ${
              isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Confirm & Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

export default function SummaryModal() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Toaster position="top-center" richColors closeButton />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading loan details...</p>
        </div>
      </div>
    }>
      <SummaryContent />
    </Suspense>
  );
}