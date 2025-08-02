'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiHome, FiCheckCircle, FiXCircle } from 'react-icons/fi';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const getProfile = async () => {
  try {
    const tokenRes = await fetch('/api/users/me');
    const tokenData = await tokenRes.json();
    const token = tokenData.token;

    if (!token) {
      setError('Registration Required');
      return;
    }

    const { userId } = jwtDecode(token);
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error('Failed to fetch profile');

    const { data } = await res.json();
    setUser(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <FiXCircle size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Profile Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={getProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md mb-4">
              <FiUser className="text-blue-600 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              user.status === 'Verified' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.status === 'Verified' ? (
                <FiCheckCircle className="mr-1" />
              ) : (
                <FiXCircle className="mr-1" />
              )}
              {user.status}
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Personal Information
            </h2>
            
            <div className="space-y-5">
              <ProfileField 
                icon={<FiMail className="text-blue-500" />} 
                label="Email" 
                value={user.email} 
              />
              <ProfileField 
                icon={<FiPhone className="text-blue-500" />} 
                label="Phone" 
                value={user.phone || 'Not provided'} 
              />
              <ProfileField 
                icon={<FiCreditCard className="text-blue-500" />} 
                label="CNIC" 
                value={user.cnic || 'Not provided'} 
              />
              <ProfileField 
                icon={<FiHome className="text-blue-500" />} 
                label="Address" 
                value={user.address || 'Not provided'} 
              />
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4 mt-1">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <p className="mt-1 text-lg text-gray-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;