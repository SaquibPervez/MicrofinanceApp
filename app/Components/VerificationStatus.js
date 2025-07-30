'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function VerificationStatus() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('token');
      setIsVerified(!!token);
    };

    checkToken();
    const interval = setInterval(checkToken, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className={`relative flex h-2 w-2 ${isVerified ? 'bg-green-500' : 'bg-gray-400'}`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isVerified ? 'bg-green-400' : 'bg-gray-300'} opacity-75`} />
      </span>
      <span className={`text-lg font-medium ${isVerified ? 'text-green-600' : 'text-gray-500'}`}>
        {isVerified ? 'Verified' : 'Not Verified'}
      </span>
    </div>
  );
}
