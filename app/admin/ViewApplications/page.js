'use client'

import { useEffect, useState } from "react"

function ViewApplication() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingLoan, setEditingLoan] = useState(null)
  const [formData, setFormData] = useState({
    status: '',
    appointmentDate: '',
    appointmentTime: '',
    officeLocation: '',
    tokenNumber: ''
  })

  const handleallReq = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/loanreq(all)')
      if (!response.ok) throw new Error('Failed to fetch loan requests')
      const data = await response.json()
      setLoans(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (loan) => {
    setEditingLoan(loan._id)
    setFormData({
      status: loan.status,
      appointmentDate: loan.appointmentDetails?.date || '',
      appointmentTime: loan.appointmentDetails?.time || '',
      officeLocation: loan.appointmentDetails?.officeLocation || '',
      tokenNumber: loan.tokenNumber || ''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateTokenNumber = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const tokenNo = `TKN-${randomNum}`
    setFormData(prev => ({ ...prev, tokenNumber: tokenNo }))
  }

  const handleSubmit = async (loanId) => {
    try {
      const response = await fetch(`/api/admin/allLoans/${loanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: formData.status,
          appointmentDetails: {
            date: formData.appointmentDate,
            time: formData.appointmentTime,
            officeLocation: formData.officeLocation
          },
          tokenNumber: formData.tokenNumber
        })
      })

      if (!response.ok) throw new Error('Update failed')
      
      setEditingLoan(null)
      handleallReq() 
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => { handleallReq() }, [])

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-7xl mx-auto p-6 overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Loan Requests Management
      </h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loan requests found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Token No.</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Subcategory</th>
              <th className="px-4 py-2 border">Loan Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Appointment Date</th>
              <th className="px-4 py-2 border">Appointment Time</th>
              <th className="px-4 py-2 border">Office Location</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {editingLoan === loan._id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="tokenNumber"
                        value={formData.tokenNumber}
                        onChange={handleChange}
                        className="border p-1 w-24"
                      />
                      <button 
                        onClick={generateTokenNumber}
                        className="bg-blue-100 text-blue-600 px-2 rounded text-xs"
                      >
                        Generate
                      </button>
                    </div>
                  ) : (
                    loan.tokenNumber || 'N/A'
                  )}
                </td>
                <td className="px-4 py-2 border">{loan.category}</td>
                <td className="px-4 py-2 border">{loan.subcategory}</td>
                <td className="px-4 py-2 border">{loan.loanAmount}</td>
                <td className="px-4 py-2 border">
                  {editingLoan === loan._id ? (
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="border p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(loan.status)}`}>
                      {loan.status.toUpperCase()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingLoan === loan._id ? (
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  ) : (
                    loan.appointmentDetails?.date || 'Not set'
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingLoan === loan._id ? (
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  ) : (
                    loan.appointmentDetails?.time || 'Not set'
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingLoan === loan._id ? (
                    <input
                      type="text"
                      name="officeLocation"
                      value={formData.officeLocation}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  ) : (
                    loan.appointmentDetails?.officeLocation || 'Not set'
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingLoan === loan._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubmit(loan._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingLoan(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(loan)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
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