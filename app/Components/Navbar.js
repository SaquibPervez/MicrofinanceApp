'use client'
import React, { useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
     const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsVerified(true);
    }
  }, []);
  const getPageTitle = () => {
    switch(pathname) {
      case '/profile':
        return 'My Profile';
      case '/dashboard':
        return 'Our Loans';
      case '/loandetail':
        return 'Your Loan Details';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-100 shadow-sm px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {getPageTitle()}
          </h2>
        </div>
        {isVerified ? (
        <span className="text-green-600 font-semibold">Verified</span>
      ) : (
        <span className="text-gray-500">Not Verified</span>
      )}
      </div>
    </header>
  );
}