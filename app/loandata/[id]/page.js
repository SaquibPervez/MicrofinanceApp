export default async function LoanDetailPage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/loan-request/${id}`);

  if (!res.ok) {
    return <div className="p-6 text-red-600">Error fetching loan data</div>;
  }

  const { data: loan } = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Loan Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
          <div>
            <strong>Category:</strong> {loan.category}
          </div>
          <div>
            <strong>Subcategory:</strong> {loan.subcategory}
          </div>
          <div>
            <strong>Loan Amount:</strong> PKR {loan.loanAmount.toLocaleString()}
          </div>
          <div>
            <strong>Initial Deposit:</strong> PKR {loan.initialDeposit.toLocaleString()}
          </div>
          <div>
            <strong>Monthly Payment:</strong> PKR {loan.monthlyPayment.toLocaleString()}
          </div>
          <div>
            <strong>Loan Period:</strong> {loan.loanPeriod}
          </div>
          <div>
            <strong>Status:</strong> {loan.status}
          </div>
          <div>
            <strong>Token Number:</strong> {loan.tokenNumber || 'Not Assigned'}
          </div>
          <div>
            <strong>Appointment Date:</strong> {loan.appointmentDetails?.date || 'Not set'}
          </div>
          <div>
            <strong>Appointment Time:</strong> {loan.appointmentDetails?.time}
          </div>
          <div>
            <strong>Office Location:</strong> {loan.appointmentDetails?.officeLocation}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(loan.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
