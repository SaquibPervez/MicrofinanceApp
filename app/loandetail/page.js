'use client';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserLoanPDF from "../Components/LoanDetailPDF";
import { FiDownload, FiClock, FiCalendar, FiMapPin, FiDollarSign, FiCreditCard, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import QRCode from '../Components/QRCode';

function LoanDetail() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrText, setQrText] = useState('');
  const [expandedLoan, setExpandedLoan] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);

  async function LoanData(loan) {
    const res = await fetch(`/api/loan-request/${loan._id}`);
    const data = await res.json();
    const qrUrl = `http://192.168.18.89:3000/loandata/${loan._id}`; 
    setQrText(qrUrl);
    setCurrentLoan(loan);
    setShowQRModal(true);
  }

  const closeQRModal = () => {
    setShowQRModal(false);
    setQrText('');
    setCurrentLoan(null);
  };

 const getLoans = async () => {
  try {
    const tokenRes = await fetch('/api/users/me');
    const tokenData = await tokenRes.json();
    const token = tokenData.token;

    if (!token) {
      setError('Registration Required');
      return;
    }

    const { userId } = jwtDecode(token);
    const res = await fetch('/api/loan-request/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error('Failed to fetch loans');

    const { data } = await res.json();
    setLoans(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getLoans();
  }, []);

  const formatCurrency = (amount) => `PKR ${amount?.toLocaleString('en-PK') || '0'}`;
  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-PK') : 'Not set';

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center";
    
    switch (status) {
      case 'approved':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>
          <FiClock className="mr-1" /> Approved
        </span>;
      case 'rejected':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>
          <FiClock className="mr-1" /> Rejected
        </span>;
      default:
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          <FiClock className="mr-1" /> Pending
        </span>;
    }
  };

  const toggleExpandLoan = (loanId) => {
    setExpandedLoan(expandedLoan === loanId ? null : loanId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your loan applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Loans Details</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={getLoans}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 py-8 px-4 sm:px-6 lg:px-8 mt-10">
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeQRModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX className="h-6 w-6" />
            </button>
            
            <h2 className="text-xl font-bold text-center mb-4">Loan QR Code</h2>
          
            <div className="flex justify-center mb-6">
              <QRCode text={qrText} size={500} />
            </div>
      
            <div className="flex justify-center mt-6">
              <button
                onClick={closeQRModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Applications
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">Your Loan Applications</h1>
              <div className="bg-white/20 rounded-full px-3 py-1 text-white text-xs sm:text-sm">
                Total: {loans.length}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loans.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FiCreditCard className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No loan applications found</h3>
                <p className="mt-1 text-sm sm:text-base text-gray-500">You haven't applied for any loans yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loan Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Appointment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loans.map((loan) => (
                        <tr key={loan._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FiDollarSign className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{loan.category}</div>
                                <div className="text-sm text-gray-500">{loan.subcategory}</div>
                                <div className="text-xs text-gray-400">Token: {loan.tokenNumber || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(loan.loanAmount)}</div>
                            <div className="text-sm text-gray-500">Deposit: {formatCurrency(loan.initialDeposit)}</div>
                            <div className="text-sm text-gray-500">Monthly: {formatCurrency(loan.monthlyPayment)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(loan.status)}
                            <div className="text-xs text-center text-gray-500 mt-2">{loan.loanPeriod}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-900">
                              <FiCalendar className="mr-1 text-gray-400" />
                              {formatDate(loan.appointmentDetails?.date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiClock className="mr-1 text-gray-400" />
                              {loan.appointmentDetails?.time || 'Not set'}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiMapPin className="mr-1 text-gray-400" />
                              {loan.appointmentDetails?.officeLocation || 'Not set'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            <PDFDownloadLink
                              document={<UserLoanPDF loan={loan} />}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {({ loading }) => (
                                <>
                                  <FiDownload className="mr-1" />
                                  {loading ? 'Generating...' : 'PDF'}
                                </>
                              )}
                            </PDFDownloadLink>
                            <button
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={() => LoanData(loan)}
                            >
                              Show QR
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {loans.map((loan) => (
                    <div key={loan._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                      <div 
                        className="p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleExpandLoan(loan._id)}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FiDollarSign className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">{loan.category}</h3>
                            <p className="text-xs text-gray-500">{loan.subcategory}</p>
                          </div>
                        </div>
                        <div>
                          {expandedLoan === loan._id ? (
                            <FiChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <FiChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {expandedLoan === loan._id && (
                        <div className="px-4 pb-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Loan Amount:</span>
                            <span className="text-sm font-medium">{formatCurrency(loan.loanAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Deposit:</span>
                            <span className="text-sm">{formatCurrency(loan.initialDeposit)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Monthly:</span>
                            <span className="text-sm">{formatCurrency(loan.monthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Status:</span>
                            <span>{getStatusBadge(loan.status)}</span>
                          </div>
                          <div className="pt-2 border-t border-gray-200">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">Appointment</h4>
                            <div className="flex items-center text-sm text-gray-900">
                              <FiCalendar className="mr-1 text-gray-400" />
                              {formatDate(loan.appointmentDetails?.date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiClock className="mr-1 text-gray-400" />
                              {loan.appointmentDetails?.time || 'Not set'}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiMapPin className="mr-1 text-gray-400" />
                              {loan.appointmentDetails?.officeLocation || 'Not set'}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-gray-200 flex space-x-2">
                            <PDFDownloadLink
                              document={<UserLoanPDF loan={loan} />}
                              className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                              {({ loading }) => (
                                <>
                                  <FiDownload className="mr-1" />
                                  {loading ? 'Generating...' : 'PDF'}
                                </>
                              )}
                            </PDFDownloadLink>
                            <button
                              className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                              onClick={() => LoanData(loan)}
                            >
                              Show QR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetail;