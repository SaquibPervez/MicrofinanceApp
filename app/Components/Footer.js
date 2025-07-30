import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="pt-12 pb-8 px-5 sm:px-6 lg:px-8 border-t border-gray-800">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

      {/* About Section */}
      <div className="mb-6">
        <h5 className="text-xl font-semibold mb-4 text-blue-800">About LoanEase</h5>
        <p className=" mb-4">
          LoanWise provides easy, secure, and accessible loan options to help individuals and businesses achieve financial stability and growth.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-teal-400 transition-colors">
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a href="#" className=" hover:text-teal-400 transition-colors">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className=" hover:text-teal-400 transition-colors">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a href="#" className=" hover:text-teal-400 transition-colors">
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Loan Services */}
      <div className="mb-6">
        <h5 className="text-xl font-semibold mb-4 text-blue-800">Our Services</h5>
        <ul className="space-y-3 0">
          <li>Personal Loans</li>
          <li>Business Loans</li>
          <li>Student Loans</li>
          <li>Debt Consolidation</li>
        </ul>
      </div>

      {/* Resources */}
      <div className="mb-6">
        <h5 className="text-xl font-semibold mb-4 text-blue-800">Resources</h5>
        <ul className="space-y-3 ">
          <li><a href="#" className="hover:text-teal-400 transition-colors">Loan Calculator</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h5 className="text-xl font-semibold mb-4 text-blue-800">Contact Us</h5>
        <ul className="space-y-3">
          <li className="flex items-start">
            <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
            <span className="">456 Finance Ave, Capital City, CA 90001</span>
          </li>
          <li className="flex items-start">
            <FaPhoneAlt className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
            <span className="">+1 (800) 987-6543</span>
          </li>
          <li className="flex items-start">
            <FaEnvelope className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
            <span className="">support@Loanease.com</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} LoanWise. All rights reserved.
      </p>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
        <a href="#" className=" hover:text-teal-400 transition-colors">Terms of Service</a>
      </div>
    </div>
</footer>

  );
}

export default Footer;