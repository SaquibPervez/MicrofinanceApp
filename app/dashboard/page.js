'use client'
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { FiDollarSign, FiHome, FiHeart, FiBook, FiChevronRight } from 'react-icons/fi';

function Dashboard() {
  const router = useRouter();

  const loanCategories = [
    {
      id: 1,
      name: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxAmount: 500000,
      maxPeriod: 3,
      icon: <FiHeart className="text-pink-500" size={28} />,
      bgColor: "bg-pink-50",
    },
    {
      id: 2,
      name: "Home Construction Loans",
      subcategories: ["Structure", "Finishing", "Loan"],
      maxAmount: 1000000,
      maxPeriod: 5,
      icon: <FiHome className="text-blue-500" size={28} />,
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      name: "Business Startup Loans",
      subcategories: ["Buy Stall", "Advance Rent", "Shop Assets", "Shop Machinery"],
      maxAmount: 1000000,
      maxPeriod: 5,
      icon: <FiDollarSign className="text-green-500" size={28} />,
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      name: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxAmount: "Based on requirement",
      maxPeriod: 4,
      icon: <FiBook className="text-purple-500" size={28} />,
      bgColor: "bg-purple-50",
    },
  ];

  const handleloanname = (loan) => {
    const loanObject = encodeURIComponent(JSON.stringify(loan));
    const token = Cookies.get('token');
    if (token) {
      router.push(`/LoanCalculator?loan=${loanObject}`);
    } else {
      router.push('/Login');
    }
  };

  const formatCurrency = (amount) => {
    return typeof amount === 'number' ? `PKR ${amount.toLocaleString('en-PK')}` : amount;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Loan Categories
          </h1>
          <div className="w-24 h-1.5 bg-teal-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our flexible loan options designed to meet your specific financial needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {loanCategories.map((loan) => (
            <div
              key={loan.id}
              className={`${loan.bgColor} rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="p-6 flex">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-sm mr-6">
                  {loan.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{loan.name}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Available for:</h4>
                    <div className="flex flex-wrap gap-1">
                      {loan.subcategories.map((subcat, idx) => (
                        <span key={idx} className="text-xs bg-white/80 text-gray-700 px-2 py-1 rounded">
                          {subcat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Max Amount</p>
                      <p className="font-medium text-gray-800">{formatCurrency(loan.maxAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max Period</p>
                      <p className="font-medium text-gray-800">
                        {loan.maxPeriod} {loan.maxPeriod > 1 ? "years" : "year"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleloanname({
                      name: loan.name,
                      subcategories: loan.subcategories,
                      maxAmount: loan.maxAmount,
                      maxPeriod: loan.maxPeriod
                    })}
                    className="mt-2 w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200"
                  >
                    Avail Loan
                    <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Dashboard;