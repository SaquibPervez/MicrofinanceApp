'use client';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function LoanDetail() {
  const [loans, setLoans] = useState([]);

  const getLoans = async () => {
     const token = Cookies.get('token')
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

  const formatRupees = (amount) => `₨: ${amount.toLocaleString()}`;

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
  <div className="max-w-7xl mx-auto p-6 overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Loan Requests
      </h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loan requests found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Subcategory</th>
              <th className="px-4 py-2 border">Loan Amount</th>
              <th className="px-4 py-2 border">Initial Deposit</th>
              <th className="px-4 py-2 border">Monthly Payment</th>
              <th className="px-4 py-2 border">Loan Period</th>
              <th className="px-4 py-2 border">token Number</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Appointment Date</th>
              <th className="px-4 py-2 border">Appointment Time</th>
              <th className="px-4 py-2 border">Office Location</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="px-4 py-2 border">{loan.category}</td>
                <td className="px-4 py-2 border">{loan.subcategory}</td>
                <td className="px-4 py-2 border">{formatRupees(loan.loanAmount)}</td>
                <td className="px-4 py-2 border">{formatRupees(loan.initialDeposit)}</td>
                <td className="px-4 py-2 border">{formatRupees(loan.monthlyPayment)}</td>
                <td className="px-4 py-2 border">{loan.loanPeriod}</td>
                <td className="px-4 py-2 border">{loan.tokenNumber}</td>
                <td className={`px-4 py-2 border font-medium ${getStatusBadgeColor(loan.status)}`}>
                  {loan.status.toUpperCase()}
                </td>
                <td className="px-4 py-2 border">
                  {loan.appointmentDetails?.date
                    ? new Date(loan.appointmentDetails.date).toLocaleDateString()
                    : 'Will be set by admin'}
                </td>
                <td className="px-4 py-2 border">
                  {loan.appointmentDetails?.time || 'Not set'}
                </td>
                <td className="px-4 py-2 border">
                  {loan.appointmentDetails?.officeLocation || 'Not set'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LoanDetail;
