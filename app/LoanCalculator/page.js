'use client'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function Calculator() {
  const router = useRouter();
const searchParams = useSearchParams();
  const loanObject = searchParams.get('loan');
 let loan = null;
  try {
    loan = loanObject ? JSON.parse(decodeURIComponent(loanObject)) : null;
  } catch (error) {
    console.error("Error parsing loan data:", error);
  };

  const [subcategory, setSubcategory] = useState("");
  const [Initialdeposit, setInitialdeposit] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [monthlypay, setmonthlypay] = useState("")

  const calculateMonthlyPay = () => {
 
};

  return (
    <>
    <div><Toaster/></div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Calculator</h1>
        <p className="text-gray-600">Enter the loan details to calculate your monthly payment</p>
      </div>

      <div className="space-y-6">
        {/* Loan Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Loan Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Selected Category</p>
              <p className="text-lg font-semibold text-gray-800">{loan.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Max Amount</p>
              <p className="text-lg font-semibold text-gray-800">
                {typeof loan.maxAmount === 'number' ? `₨${loan.maxAmount.toLocaleString()}` : loan.maxAmount}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Max Period</p>
              <p className="text-lg font-semibold text-gray-800">
                {loan.maxPeriod} {loan.maxPeriod > 1 ? 'Years' : 'Year'}
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-4" 
        onSubmit={(e) => e.preventDefault()}>
        <select
        required
        name="subcategory"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      >
        <option value="">Select a subcategory</option>
        {loan.subcategories.map((subcategory, index) => (
          <option key={index} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (Max is ₨: {loan.maxAmount})</label>
            <input 
            required
              type="number" 
              id="loanAmount" 
              name="loanAmount" 
              placeholder="Enter amount"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={loanAmount}
      onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

              <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Deposit (₨) (If Any)</label>
            <input 
            required
              type="number" 
              id="initialDeposit" 
              name="initialDeposit" 
              placeholder="Enter amount"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={Initialdeposit}  
      onChange={(e) => setInitialdeposit(e.target.value)}
            />
          </div>
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Period (Years)</label>
 <select
        required
        name="loanPeriod"
        value={loanPeriod}
        onChange={(e) => setLoanPeriod(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      >
        <option value="">Select a Loan Period</option>
          <option>6 Months</option>
          <option>12 Months (1 Year)</option>
          <option>18 Months</option>
          <option>24 Months (2 Year)</option>
          <option>30 Months</option>
          <option>36 Months (3 Year)</option>
          <option>42 Months</option>
          <option>48 Months (4 Year)</option>
      </select>

</div>
          <div className="pt-4">
            <button 
            onClick={() => {
       const amount = parseFloat(loanAmount);
    const deposit = Initialdeposit ? parseFloat(Initialdeposit) : 0;
    const period = parseInt(loanPeriod); 
    
  const principal = amount - deposit;
  const monthly = (principal / period);
  const monthlypay = Math.round(monthly);           
    const LoanData = {
      loan: loan.name,
      subcategory,
      deposit: Initialdeposit,
      amount: loanAmount,
      period: loanPeriod,
      monthlypay,
    };

    const LoanSummary = encodeURIComponent(JSON.stringify(LoanData));
    router.push(`/LoanSummary?loan=${LoanSummary}`);
  }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
            >
              Show Loan Summary
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Calculator