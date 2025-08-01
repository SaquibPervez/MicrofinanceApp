'use client'
import { useEffect, useState } from 'react'
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

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
      status: loan.status || 'pending',
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
    const styles = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status) => {
    const icons = {
      approved: <CheckCircleIcon className="h-4 w-4" />,
      rejected: <XCircleIcon className="h-4 w-4" />,
      pending: <ClockIcon className="h-4 w-4" />
    }
    return icons[status] || null
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <p className="text-red-700">Error: {error}</p>
      <button 
        onClick={fetchLoans}
        className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 flex items-center gap-1"
      >
        <ArrowPathIcon className="h-4 w-4" />
        Retry
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Loan Application Management</h2>
          <p className="text-sm text-gray-500 mt-1">Review and update loan applications</p>
        </div>

        {loans.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No loan applications found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Token', 'Category', 'Subcategory', 'Amount', 'Status', 'Date', 'Time', 'Office', 'Actions'].map((header, index) => (
                    <th 
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan._id} className="hover:bg-gray-50 transition-colors">
                    {/* Token Number */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loan._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            name="token"
                            value={form.token}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 text-sm w-24 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button 
                            onClick={generateToken}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Generate
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {loan.tokenNumber || 'N/A'}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.subcategory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs. {loan.loanAmount?.toLocaleString('en-IN') || '0'}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loan._id ? (
                        <select
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(loan.status)}`}>
                          {getStatusIcon(loan.status)}
                          <span className="ml-1">{loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === loan._id ? (
                        <input 
                          type="date" 
                          name="date" 
                          value={form.date} 
                          onChange={handleChange} 
                          className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : loan.appointmentDetails?.date || 'Not set'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === loan._id ? (
                        <input 
                          type="time" 
                          name="time" 
                          value={form.time} 
                          onChange={handleChange} 
                          className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : loan.appointmentDetails?.time ? formatTime(loan.appointmentDetails.time) : 'Not set'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === loan._id ? (
                        <input 
                          type="text" 
                          name="office" 
                          value={form.office} 
                          onChange={handleChange} 
                          className="border rounded px-2 py-1 text-sm w-full focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Office location"
                        />
                      ) : loan.appointmentDetails?.officeLocation || 'Not set'}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === loan._id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveEdit(loan._id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                          >
                            <XMarkIcon className="h-4 w-4 mr-1" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(loan)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <PencilSquareIcon className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewApplication