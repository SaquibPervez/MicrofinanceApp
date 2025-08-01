import {
  CheckBadgeIcon,
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

function LandingPage() {
  return (
    <>
        <section className="flex flex-col md:flex-row items-center mx-10 gap-8">
      <div className="md:w-1/2 text-center md:text-left">
       <h1 className="text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
  Loans for Life’s Biggest Moments
</h1>
<p className="text-lg text-gray-700 mb-8 leading-relaxed">
  Whether you're planning a dream wedding, building your home, growing your business, or funding your education — we make borrowing simple, fast, and stress-free.
</p>
<a
  href="/dashboard"
  className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-md"
>
  Apply Now. Get Approved in 24 Hours.
</a>
      </div>

      <div className="md:w-1/2">
        <img
          src="/loan-image.png"
          alt="Loan application"
          className="rounded-lg w-full object-cover"
          style={{ aspectRatio: '4 / 4' }}
          />
      </div>
      
    </section>

      <section
      id="benefits"
      className="mt-10 grid gap-12 md:grid-cols-3 text-center mx-6 md:mx-10"
    >
      <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.03] transform">
        <CheckBadgeIcon className="mx-auto mb-5 w-14 h-14 text-blue-600 group-hover:text-blue-800 transition duration-300" />
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Quick Approval</h3>
        <p className="text-gray-600 leading-relaxed">
          Get your loan approved within 24 hours with minimal paperwork.
        </p>
      </div>

      <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.03] transform">
        <AdjustmentsHorizontalIcon className="mx-auto mb-5 w-14 h-14 text-blue-600 group-hover:text-blue-800 transition duration-300" />
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Flexible Terms</h3>
        <p className="text-gray-600 leading-relaxed">
          Customize your repayment schedule that fits your budget.
        </p>
      </div>

      <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.03] transform">
        <CurrencyDollarIcon className="mx-auto mb-5 w-14 h-14 text-blue-600 group-hover:text-blue-800 transition duration-300" />
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Transparent Fees</h3>
        <p className="text-gray-600 leading-relaxed">
          No hidden charges — what you see is what you pay.
        </p>
      </div>
    </section>
    </>
  )
}

export default LandingPage