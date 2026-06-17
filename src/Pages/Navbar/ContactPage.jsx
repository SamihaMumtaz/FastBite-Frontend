import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import contact from "../../assets/productimg/contact.png";
import BottomContact from "./BottomContact";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
      const newContact = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleString(),
        status: "unread"
      };
      contacts.push(newContact);
      localStorage.setItem("contacts", JSON.stringify(contacts));

      toast.success("Message sent successfully! We'll get back to you soon.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[rgb(255,243,224)] px-6 lg:px-24 py-16 mt-22">
        <Toaster position="top-center" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <div className="w-16 h-1 bg-orange-500 mb-4 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed">
              FastBite brings delicious meals to you with speed and care. Have questions? 
              We're here to help! Reach out to us anytime.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span>support@fastbite.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span>Lahore, Pakistan</span>
              </div>
            </div>

            <div className="mt-10">
              <img src={contact} alt="contact" className="w-64 mx-auto" />
            </div>
          </motion.div>

          <motion.form
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        </div>
      </div>

      <BottomContact />
    </>
  );
};

export default ContactPage;