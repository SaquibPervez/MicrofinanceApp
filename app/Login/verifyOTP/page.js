'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function VerifyOTP() {
    const router = useRouter()
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || !email) {
      alert('Missing OTP or email');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/users/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const result = await res.json();

      if (res.ok) {
        Cookies.set('token', result.token, { expires: 7, secure: true });
        alert('OTP Verified. You are now logged in.');
        router.push('/dashboard')
      } else {
        alert(result.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <p className="mb-2 text-gray-600">We sent an OTP to <b>{email}</b></p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="border w-full p-2 mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
}
