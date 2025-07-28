'use client'
import { useRouter } from "next/navigation";
function Dashboard() {
  const router = useRouter();

    const loanCategories = [
  {
    id: 1,
    name: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxAmount: 500000,
    maxPeriod: 3,
    icon: "/wedding.png",
  },
  {
    id: 2,
    name: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxAmount: 1000000,
    maxPeriod: 5,
    icon: "/house.png",
  },
  {
    id: 3,
    name: "Business Startup Loans",
    subcategories: ["Buy Stall", "Advance Rent", "Shop Assets", "Shop Machinery"],
    maxAmount: 1000000,
    maxPeriod: 5,
    icon: "/investment.png",
  },
  {
    id: 4,
    name: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxAmount: "Based on requirement",
    maxPeriod: 4,
    icon: "/online-learning.png",
  },
];
const handleloanname = (loan)=>{
   const loanObject = encodeURIComponent(JSON.stringify(loan));
  const token = localStorage.getItem('token')
  if (token) {
    router.push(`/LoanCalculator?loan=${loanObject}`)
  }
  else{
      router.push('/Login')
    }
}
  return (
    <>
   <h1 className='py-4 text-center text-4xl text-black'>Our Loan Categories</h1>
   <div className="w-20 h-1 bg-teal-600 mx-auto mb-5"></div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10">
  {loanCategories.map(({ id, name, subcategories, maxAmount, maxPeriod, icon }) => (
    <div
      key={id}
      className="bg-white shadow rounded-lg p-6 flex space-x-6 items-start"
    >
      <img
        src={icon}
        alt={`${name} icon`}
        className="w-16 h-16 object-contain"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-600">{name}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Subcategories:</span> {subcategories.join(", ")}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Max Amount:</span>{" "}
          {typeof maxAmount === "number" ? `₨${maxAmount.toLocaleString()}` : maxAmount}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Max Period:</span> {maxPeriod} {maxPeriod > 1 ? "years" : "year"}
        </p>
        
        {/* <Link href={}  > */}

        <button  onClick={() => handleloanname({name, subcategories,maxAmount, maxPeriod }) }
        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Avail Loan
        </button>
        {/* </Link> */}
      </div>
    </div>
  ))}
</div>
        </>
  )
}

export default Dashboard