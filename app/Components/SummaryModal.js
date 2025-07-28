import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
function SummaryModal({show, onClose,onPreceed, loan, subcategory,deposit,amount, period,monthlyPay}) {
    if (!show) return null;
    const router = useRouter();
    
   const submitLoanReq = async () => {
    const token = localStorage.getItem('token');
const decoded = jwtDecode(token); 
const userId = decoded.userId; 

  try {
    const response = await fetch('/api/loan-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: loan,
        subcategory,  
        initialDeposit: deposit,
        loanAmount: amount,
        loanPeriod: period,
        monthlyPayment: monthlyPay,
        userId
      }),
    });
    let result;
    try {
      result = await response.json(); 
      console.log(result.data, "data")
    } catch (jsonError) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server returned non-JSON response');
    }

    if (!response.ok) {
      alert(`Error: ${result.message || 'Something went wrong'}`);
      return;
    }

    alert('Loan request saved');
    router.push('loandetail')
  } catch (error) {
    console.error('Loan request error:', error);
    alert('An error occurred while submitting your loan request.');
  }
};


  return (
  <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 h-full">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Loan Summary</h2>
      <p><strong>Selected Category:</strong> {loan}</p>
      <p><strong>Selected Subcategory:</strong> {subcategory}</p>
      <p><strong>Initial Deposit:</strong> Rs. {deposit}</p>
      <p><strong>Loan Amount:</strong> Rs. {amount}</p>
      <p><strong>Loan Period:</strong> {period}</p>
      <h3 className="text-lg font-bold text-gray-700 mt-4">Monthly Payment:</h3>
      <p className="mb-4">Rs. {monthlyPay}</p>

      <div className="flex justify-end space-x-3">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={()=>{
            // {onPreceed}
            submitLoanReq()
            }
          }
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
)}


export default SummaryModal