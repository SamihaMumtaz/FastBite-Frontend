import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaClock, FaCreditCard, FaTruck, FaMapMarkerAlt, FaHeadset, FaQuestionCircle, FaShoppingCart, FaBan } from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const HelpPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helpTopics = [
    {
      question: "How do I place an order?",
      answer: "Browse our menu, select the item, choose size or quantity, and click 'Order Now'. You can pay online or on delivery. You can also add items to cart and review before placing the order.",
      icon: <FaShoppingCart className="text-2xl" />,
    },
    {
      question: "What are the payment methods?",
      answer: "We accept Cash on Delivery, Credit/Debit Cards, and online wallets. All transactions are encrypted and secure. Safe & secure transactions guaranteed.",
      icon: <FaCreditCard className="text-2xl" />,
    },
    {
      question: "Can I track my order?",
      answer: "Yes! After placing an order, you will get a tracking link and SMS notifications about your order status. You can also track in real-time from your dashboard.",
      icon: <FaTruck className="text-2xl" />,
    },
    {
      question: "What is the delivery time?",
      answer: "Delivery usually takes 20-40 minutes depending on your location. We ensure fresh and hot meals reach you fast. You'll receive updates via SMS.",
      icon: <FaClock className="text-2xl" />,
    },
    {
      question: "How can I cancel or modify an order?",
      answer: "You can cancel or modify your order within 10 minutes of placing it by contacting our support via phone or email. Once the order is being prepared, modifications may not be possible.",
      icon: <FaBan className="text-2xl" />,
    },
  ];

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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Help Center</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Find answers to your questions and get the support you need
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
            <p className="text-xs text-gray-500">30 Min Delivery</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
            <FaCreditCard className="text-2xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Secure Payment</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
            <FaTruck className="text-2xl text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Free Tracking</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                    {topic.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{topic.question}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">{topic.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Still Need Help?</h2>
          <p className="text-orange-100 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">
              <FaPhoneAlt className="text-sm" />
              <span className="text-sm">+92 300 1234567</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">
              <FaEnvelope className="text-sm" />
              <span className="text-sm">support@fastbite.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">
              <FaMapMarkerAlt className="text-sm" />
              <span className="text-sm">Lahore, Pakistan</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Available daily from 10:00 AM to 11:00 PM
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;