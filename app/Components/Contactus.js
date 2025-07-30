import React from 'react'

function Contactus() {
  return (
    <section className="py-16 mx-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Form Section */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          Have a question about our loan services or want to speak with our team? Fill out the form and we’ll get back to you shortly.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div>
        <img
          src="/contact-me.png"
          alt="Contact illustration"
          className="w-full h-full object-cover rounded-xl "
        />
      </div>
    </div>
</section>

  )
}

export default Contactus