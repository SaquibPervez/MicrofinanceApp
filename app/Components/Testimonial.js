import React from 'react'

function Testimonial() {
  return (
    <section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Clients Say</h2>
      <div className="w-20 h-1 bg-teal-600 mx-auto my-2"></div>
      <p className="mt-3 text-gray-600">Real stories from satisfied borrowers</p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Testimonial 1 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 text-base mb-4">
          “The wedding loan made everything possible for our big day. The terms were flexible and the support was amazing.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://i.pinimg.com/736x/0a/43/08/0a4308750d555ada601dc5939302ab8f.jpg"
            alt="Client photo"
          />
          <div>
            <p className="font-semibold text-gray-900">Ayesha Malik</p>
            <p className="text-sm text-gray-500">Karachi, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 text-base mb-4">
          “With the business startup loan, I launched my own tailoring shop. Everything from application to disbursement was smooth.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?semt=ais_hybrid&w=740"
            alt="Client photo"
          />
          <div>
            <p className="font-semibold text-gray-900">Imran Qureshi</p>
            <p className="text-sm text-gray-500">Lahore, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 text-base mb-4">
          “I used the education loan to pay university fees without stress. It's a great initiative for students and parents alike.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://t4.ftcdn.net/jpg/02/92/76/21/360_F_292762118_dmWqwlN9lDmhqCHKmUYmZW6F7LaUWc80.jpg"
            alt="Client photo"
          />
          <div>
            <p className="font-semibold text-gray-900">Bilal Ahmed</p>
            <p className="text-sm text-gray-500">Islamabad, Pakistan</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Testimonial