import React from 'react';
import { FiHeart, FiHome, FiBriefcase, FiBook, FiDollarSign, FiClock, FiGift, FiLayers } from 'react-icons/fi';

function Services() {
  const loanServices = [
    {
      id: 1,
      title: "Complete Wedding Package Loan",
      category: "Wedding Financing",
      icon: <FiHeart className="text-teal-600" />,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
      features: [
        {
          icon: <FiGift className="text-teal-600" />,
          title: "Covered Expenses",
          description: "Valima, Furniture, Valima Food, Jahez"
        },
        {
          icon: <FiDollarSign className="text-teal-600" />,
          title: "Loan Amount",
          description: "Up to PKR 500,000 (5 Lakh)"
        },
        {
          icon: <FiClock className="text-teal-600" />,
          title: "Repayment Period",
          description: "Flexible terms up to 3 years"
        }
      ]
    },
    {
      id: 2,
      title: "Build Your Dream Home with Flexible Financing",
      category: "Home Construction Loans",
      icon: <FiHome className="text-teal-600" />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      features: [
        {
          icon: <FiLayers className="text-teal-600" />,
          title: "Covered Expenses",
          description: "Structure, Finishing, Loan"
        },
        {
          icon: <FiDollarSign className="text-teal-600" />,
          title: "Loan Amount",
          description: "Up to PKR 1,000,000 (10 Lakh)"
        },
        {
          icon: <FiClock className="text-teal-600" />,
          title: "Repayment Period",
          description: "Flexible terms up to 5 years"
        }
      ]
    },
    {
      id: 3,
      title: "Launch & Grow Your Business with Confidence",
      category: "Business Startup Loans",
      icon: <FiBriefcase className="text-teal-600" />,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: [
        {
          icon: <FiLayers className="text-teal-600" />,
          title: "Covered Expenses",
          description: "Buy Stall, Advance Rent for Shop, Shop Assets, Shop Machinery"
        },
        {
          icon: <FiDollarSign className="text-teal-600" />,
          title: "Loan Amount",
          description: "Up to PKR 1,000,000 (10 Lakh)"
        },
        {
          icon: <FiClock className="text-teal-600" />,
          title: "Repayment Period",
          description: "Flexible terms up to 5 years"
        }
      ]
    },
    {
      id: 4,
      title: "Invest in Education for a Brighter Future",
      category: "Education Loans",
      icon: <FiBook className="text-teal-600" />,
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
      features: [
        {
          icon: <FiLayers className="text-teal-600" />,
          title: "Covered Expenses",
          description: "University Fees, Child Fees Loan"
        },
        {
          icon: <FiDollarSign className="text-teal-600" />,
          title: "Loan Amount",
          description: "Based on requirement"
        },
        {
          icon: <FiClock className="text-teal-600" />,
          title: "Repayment Period",
          description: "Flexible terms up to 4 years"
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-blue-100 mx-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Loan Services
          </h2>
          <div className="w-20 h-1.5 bg-teal-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored financial solutions designed to meet your unique needs and aspirations
          </p>
        </div>

        {/* Loan Services Cards */}
        <div className="space-y-12">
          {loanServices.map((service) => (
            <div 
              key={service.id}
              className="flex flex-col lg:flex-row items-stretch bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="lg:w-5/12 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="lg:w-7/12 p-8 md:p-10">
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">
                    {service.icon}
                    <span className="ml-2">{service.category}</span>
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  {service.title}
                </h3>

                <div className="space-y-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-teal-600">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}

export default Services;