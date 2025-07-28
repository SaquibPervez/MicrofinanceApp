'use client';

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function LoanDetail() {
  const [loans, setLoans] = useState([]);

  const getLoans = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const { userId } = jwtDecode(token);

    const res = await fetch('/api/loan-request/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    setLoans(data.data);
  };

  useEffect(() => {
    getLoans();
  }, []);

  const formatRupees = (amount) => `₨${amount.toLocaleString()}`;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Loan Requests
      </h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loan requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {loan.category}
                </h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(
                    loan.status
                  )}`}
                >
                  {loan.status.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-1">
                <strong>Subcategory:</strong> {loan.subcategory}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Amount:</strong> {formatRupees(loan.loanAmount)}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Initial Deposit:</strong> {formatRupees(loan.initialDeposit)}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Monthly Payment:</strong> {formatRupees(loan.monthlyPayment)}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Loan Period:</strong> {loan.loanPeriod}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Created: {new Date(loan.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoanDetail;
