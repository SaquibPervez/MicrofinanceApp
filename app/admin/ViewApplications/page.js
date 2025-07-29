'use client'

import { useEffect, useState } from 'react'

function ViewApplication() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    status: '',
    date: '',
    time: '',
    office: '',
    token: ''
  })

  const fetchLoans = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/loanreq(all)')
      if (!res.ok) throw new Error('Failed to fetch loan requests')
      const data = await res.json()
      setLoans(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLoans() }, [])

  const startEdit = (loan) => {
    setEditingId(loan._id)
    setForm({
      status: loan.status || '',
      date: loan.appointmentDetails?.date || '',
      time: loan.appointmentDetails?.time || '',
      office: loan.appointmentDetails?.officeLocation || '',
      token: loan.tokenNumber || ''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const generateToken = () => {
    const rand = `TKN-${Math.floor(1000 + Math.random() * 9000)}`
    setForm(prev => ({ ...prev, token: rand }))
  }
  
  const formatTime = (timeString) => {
  if (!timeString) return 'Not set'
  const [hour, minute] = timeString.split(':')
  const h = parseInt(hour)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${minute} ${suffix}`
}

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`/api/admin/allLoans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: form.status,
          appointmentDetails: {
            date: form.date,
            time: form.time,
            officeLocation: form.office
          },
          tokenNumber: form.token
        })
      })
      if (!res.ok) throw new Error('Update failed')
      setEditingId(null)
      fetchLoans()
    } catch (err) {
      setError(err.message)
    }
  }

  const getStatusStyle = (status) => {
    return {
      approved: 'text-green-600 bg-green-100',
      rejected: 'text-red-600 bg-red-100',
      pending: 'text-yellow-600 bg-yellow-100'
    }[status] || ''
  }

  if (loading) return <div className="text-center py-6">Loading...</div>
  if (error) return <div className="text-center text-red-500 py-6">Error: {error}</div>

  return (
    <div className="max-w-6xl mx-auto p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Loan Requests</h2>
      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loan requests found.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {['Token', 'Category', 'Subcategory', 'Amount', 'Status', 'Date', 'Time', 'Office', 'Actions']
                .map((th, i) => (
                  <th key={i} className="border px-3 py-2 text-left">{th}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
                {/* Token Number */}
                <td className="border px-3 py-2">
                  {editingId === loan._id ? (
                    <div className="flex gap-2">
                      <input
                        name="token"
                        value={form.token}
                        onChange={handleChange}
                        className="border px-1 w-24"
                      />
                      <button onClick={generateToken} className="text-xs text-blue-600">Gen</button>
                    </div>
                  ) : loan.tokenNumber || 'N/A'}
                </td>

                {/* Category/Subcategory/Amount */}
                <td className="border px-3 py-2">{loan.category}</td>
                <td className="border px-3 py-2">{loan.subcategory}</td>
                <td className="border px-3 py-2">Rs: {loan.loanAmount.toLocaleString('en-IN')}</td>

                {/* Status */}
                <td className="border px-3 py-2">
                  {editingId === loan._id ? (
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="border px-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(loan.status)}`}>
                      {loan.status.toUpperCase()}
                    </span>
                  )}
                </td>

                {/* Appointment Date/Time/Location */}
                <td className="border px-3 py-2">
                  {editingId === loan._id ? (
                    <input type="date" name="date" value={form.date} onChange={handleChange} className="border px-1" />
                  ) : loan.appointmentDetails?.date || 'Not set'}
                </td>
               <td className="border px-3 py-2">
  {editingId === loan._id ? (
    <input
      type="time"
      name="time"
      value={form.time}
      onChange={handleChange}
      className="border px-1"
    />
  ) : (
    loan.appointmentDetails?.time
      ? formatTime(loan.appointmentDetails.time)
      : 'Not set'
  )}
</td>

                <td className="border px-3 py-2">
                  {editingId === loan._id ? (
                    <input type="text" name="office" value={form.office} onChange={handleChange} className="border px-1" />
                  ) : loan.appointmentDetails?.officeLocation || 'Not set'}
                </td>

                {/* Actions */}
                <td className="border px-3 py-2">
                  {editingId === loan._id ? (
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(loan._id)} className="text-green-600 text-sm">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-600 text-sm">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => startEdit(loan)} className="text-blue-600 text-sm">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ViewApplication
