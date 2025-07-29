'use client'

import { useEffect, useState } from "react";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleUsers = async () => {
    try {
      const response = await fetch('/api/admin/getallusers');
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data); 
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {users?.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">CNIC</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.address}</td>
                  <td className="py-2 px-4 border">{user.phone}</td>
                  <td className="py-2 px-4 border">{user.cnic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewUsers;
