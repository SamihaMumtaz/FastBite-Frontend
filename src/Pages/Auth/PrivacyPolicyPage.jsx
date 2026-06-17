import React from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaLock, 
  FaEye, 
  FaDatabase, 
  FaCookie, 
  FaEnvelope, 
  FaUserSecret, 
  FaShieldAlt 
} from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const PrivacyPolicyPage = () => {
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
                <FaLock className="w-10 h-10 text-orange-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
            <p className="text-gray-500 mt-2">Last updated: June 10, 2026</p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaShieldAlt className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 ml-4">
                <li>Name, email address, phone number, and delivery address</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
                <li>Communications with our support team</li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaDatabase className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Process and deliver your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Improve our services and user experience</li>
                <li>Send you promotional offers (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaEye className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">3. Information Sharing</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 ml-4">
                <li>Restaurants to fulfill your orders</li>
                <li>Delivery partners to deliver your food</li>
                <li>Service providers who assist our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaUserSecret className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">4. Data Security</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your personal information. 
                This includes encryption, secure servers, and regular security audits. However, no method 
                of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaCookie className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">5. Cookies and Tracking</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We use cookies to enhance your browsing experience, remember your preferences, and analyze 
                site traffic. You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaEnvelope className="text-orange-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">7. Children's Privacy</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our services are not directed to individuals under 18 years of age. We do not knowingly 
                collect personal information from children. If you believe a child has provided us with 
                personal information, please contact us.
              </p>
            </div>

            <div className="pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Changes to Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page. You are advised to review this policy periodically.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <p className="text-center text-gray-600 text-sm">
              For questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@fastbite.com" className="text-orange-500 hover:text-orange-600">
                privacy@fastbite.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;