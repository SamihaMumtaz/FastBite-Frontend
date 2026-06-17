import React from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaGavel, 
  FaShieldAlt, 
  FaCreditCard, 
  FaUserSecret, 
  FaClipboardList,
  FaShoppingBag  
} from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const TermsPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-white mt-22">
      <img
        src={CurvedBG}
        alt="background"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full opacity-40 pointer-events-none select-none"
      />
      <img
        src={food}
        alt="Food"
        className="absolute top-0 right-0 w-[250px] sm:w-[300px] md:w-[430px] pointer-events-none select-none opacity-80"
      />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/register" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6">
          <FaArrowLeft className="w-4 h-4" />
          <span>Back to Registration</span>
        </Link>

        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <FaGavel className="w-10 h-10 text-orange-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
            <p className="text-gray-500 mt-2">Last updated: June 10, 2026</p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaClipboardList className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using FastBite's services, you agree to be bound by these Terms & Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaUserSecret className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">2. User Account</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You must be at least 18 years old to create an account. You are responsible for maintaining 
                the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaShoppingBag className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">3. Ordering and Payments</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                All orders placed through FastBite are subject to acceptance. Prices are subject to change without notice. 
                Payment must be made at the time of order placement unless cash on delivery is selected.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaCreditCard className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">4. Cancellation and Refunds</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Orders can be cancelled within 5 minutes of placement. Refunds will be processed according to our 
                refund policy. Please contact customer support for any refund-related queries.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaShieldAlt className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">5. Delivery Terms</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Delivery times are estimates and not guaranteed. FastBite is not responsible for delays caused by 
                weather, traffic, or other unforeseen circumstances. Please ensure accurate delivery address is provided.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. User Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide accurate and complete information when placing orders</li>
                <li>Ensure you are available to receive your delivery</li>
                <li>Not misuse or abuse our services</li>
                <li>Respect our delivery partners and restaurant staff</li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                FastBite shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use of our services. Our total liability shall not exceed the amount paid for the order.
              </p>
            </div>

            <div className="pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of FastBite after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <p className="text-center text-gray-600 text-sm">
              For questions about these Terms & Conditions, please contact us at:
              <br />
              <a href="mailto:support@fastbite.com" className="text-orange-500 hover:text-orange-600">
                support@fastbite.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;