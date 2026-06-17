import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaHeadset, FaClock, FaCreditCard, FaTruck, FaShieldAlt, FaStar } from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const faqs = [
  {
    question: "How can I place an order?",
    answer: "You can place an order by visiting our menu page, selecting your items, and clicking 'Order Now'. Follow the checkout instructions to complete your purchase. You can also add items to cart and review before placing the order.",
  },
  {
    question: "What are the payment methods available?",
    answer: "We accept Cash on Delivery (COD), credit/debit cards, and online payments through our secure payment gateway. All transactions are encrypted and secure.",
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes! FastBite delivers fresh meals right to your doorstep. Delivery times may vary based on your location, typically between 20-40 minutes.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer: "You can cancel or modify your order within 10 minutes of placing it by contacting our support team. Once the order is being prepared, modifications may not be possible.",
  },
  {
    question: "Are your meals safe and hygienic?",
    answer: "Absolutely! We follow strict hygiene standards and prepare meals fresh for every order to ensure quality and safety. Our kitchen maintains highest cleanliness standards.",
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order in real-time from your dashboard under 'My Orders' section. You'll receive updates via SMS and email about your order status.",
  },
  {
    question: "What if I have food allergies?",
    answer: "Please mention any allergies in the order notes section. Our kitchen takes extra care for allergy-related requests. You can also contact our support team for specific concerns.",
  },
  {
    question: "Do you offer bulk orders for events?",
    answer: "Yes! We offer bulk ordering for parties, corporate events, and gatherings. Please contact our support team at least 24 hours in advance for bulk orders.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">FAQs</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Everything you need to know about FastBite
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
            <FaHeadset className="text-2xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500">24/7 Support</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
            <FaClock className="text-2xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Fast Delivery</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
            <FaCreditCard className="text-2xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Secure Payment</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
            <FaShieldAlt className="text-2xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500">100% Safe</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {openIndex === index ? (
                    <FaChevronUp className="text-orange-500 text-sm" />
                  ) : (
                    <FaChevronDown className="text-orange-500 text-sm" />
                  )}
                </div>
              </div>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-orange-100 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">
              <FaHeadset className="text-sm" />
              <span className="text-sm">support@fastbite.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">
              <FaClock className="text-sm" />
              <span className="text-sm">24/7 Customer Support</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-lg" />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Rated 4.8/5 by thousands of happy customers
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;