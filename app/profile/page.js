'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'

function ProfilePage() {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    const token = Cookies.get('token')
    if (!token) return;

    const { userId } = jwtDecode(token);

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    setUser(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">👤 User Profile</h2>
        <div className="space-y-4 text-gray-700">
          <ProfileField label="Name" value={user.name} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Phone" value={user.phone} />
          <ProfileField label="CNIC" value={user.cnic} />
          <ProfileField label="Address" value={user.address} />
          <ProfileField label="Status" value={user.status} status />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, status = false }) {
  const statusColors = {
    Verified: 'text-green-600 font-semibold',
    Rejected: 'text-red-600 font-semibold',
  };

  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className={status ? statusColors[value] || 'text-gray-800' : 'text-gray-900'}>
        {value}
      </span>
    </div>
  );
}

export default ProfilePage;
