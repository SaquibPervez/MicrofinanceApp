import React from 'react'

function Services() {
  return (
    <section>
  <div className="mx-10">
    <div className="text-center my-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Loan Services</h1>
      <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
    </div>
    {/* card 1 */}
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden my-10">
      <div className="lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80"
          alt="Traditional wedding celebration"
          className="w-full h-full object-cover min-h-[300px]"
        />
      </div>

      <div className="lg:w-1/2 p-8 md:p-7">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full">
            <i className="bi bi-heart-fill text-teal-600 mr-1"></i>
            Wedding Financing
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Complete Wedding Package Loan
        </h2>

        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <i className="bi bi-gift-fill text-teal-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Covered Expenses</h3>
              <p className="text-gray-600">Valima, Furniture, Valima Food, Jahez</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <i className="bi bi-cash-coin text-teal-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Loan Amount</h3>
              <p className="text-gray-600">Up to PKR 500,000 (5 Lakh)</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <i className="bi bi-clock-fill text-teal-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Repayment Period</h3>
              <p className="text-gray-600">Flexible terms up to 3 years</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* card 2 */}

<div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden my-10">
  {/* Image */}
  <div className="lg:w-1/2">
    <img
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      alt="Home construction"
      className="w-full h-full object-cover min-h-[300px]"
    />
  </div>

  {/* Content */}
  <div className="lg:w-1/2 p-8 md:p-7">
    <div className="mb-2">
      <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full">
        <i className="bi bi-house-door-fill text-teal-600 mr-1"></i>
        Home Construction Loans
      </span>
    </div>

    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      Build Your Dream Home with Flexible Financing
    </h2>

    <div className="space-y-6 mb-8">
      {/* Subcategories */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-bricks text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Covered Expenses</h3>
          <p className="text-gray-600">Structure, Finishing, Loan</p>
        </div>
      </div>

      {/* Loan Amount */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-cash-coin text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Loan Amount</h3>
          <p className="text-gray-600">Up to PKR 1,000,000 (10 Lakh)</p>
        </div>
      </div>

      {/* Loan Duration */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-clock-fill text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Repayment Period</h3>
          <p className="text-gray-600">Flexible terms up to 5 years</p>
        </div>
      </div>
    </div>
  </div>
</div>


    {/* card 3 */}

<div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden my-10">
  {/* Image */}
  <div className="lg:w-1/2">
    <img
      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Startup Business"
      className="w-full h-full object-cover min-h-[300px]"
    />
  </div>

  {/* Content */}
  <div className="lg:w-1/2 p-8 md:p-7">
    <div className="mb-2">
      <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full">
        <i className="bi bi-briefcase-fill text-teal-600 mr-1"></i>
        Business Startup Loans
      </span>
    </div>

    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      Launch & Grow Your Business with Confidence
    </h2>

    <div className="space-y-6 mb-8">
      {/* Subcategories */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-shop-window text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Covered Expenses</h3>
          <p className="text-gray-600">
            Buy Stall, Advance Rent for Shop, Shop Assets, Shop Machinery
          </p>
        </div>
      </div>

      {/* Loan Amount */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-cash-coin text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Loan Amount</h3>
          <p className="text-gray-600">Up to PKR 1,000,000 (10 Lakh)</p>
        </div>
      </div>

      {/* Repayment Period */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-clock-fill text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Repayment Period</h3>
          <p className="text-gray-600">Flexible terms up to 5 years</p>
        </div>
      </div>
    </div>
  </div>
</div>



    {/* card 4 */}
    
   <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden mt-10">
  {/* Image */}
  <div className="lg:w-1/2">
    <img
      src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"
      alt="Students in graduation gown"
      className="w-full h-full object-cover min-h-[300px]"
    />
  </div>

  {/* Content */}
  <div className="lg:w-1/2 p-8 md:p-7">
    <div className="mb-2">
      <span className="inline-block px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-100 rounded-full">
        <i className="bi bi-mortarboard-fill text-teal-600 mr-1"></i>
        Education Loans
      </span>
    </div>

    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      Invest in Education for a Brighter Future
    </h2>

    <div className="space-y-6 mb-8">
      {/* Subcategories */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-book-fill text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Covered Expenses</h3>
          <p className="text-gray-600">University Fees, Child Fees Loan</p>
        </div>
      </div>

      {/* Loan Amount */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-cash-coin text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Loan Amount</h3>
          <p className="text-gray-600">Based on requirement</p>
        </div>
      </div>

      {/* Repayment Period */}
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <i className="bi bi-clock-fill text-teal-600 text-xl"></i>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">Repayment Period</h3>
          <p className="text-gray-600">Flexible terms up to 4 years</p>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</section>
  )
}

export default Services