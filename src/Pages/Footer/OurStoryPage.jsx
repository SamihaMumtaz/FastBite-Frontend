import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaTruck, FaStar, FaUsers, FaAward, FaClock, FaQuoteLeft } from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const OurStoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Our Story</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            A journey of passion, flavor, and love for food
          </p>
        </motion.div>

        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-xl">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <FaQuoteLeft className="text-5xl text-orange-300 mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-serif text-gray-700 italic">
              "Good food is the foundation of genuine happiness"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 text-gray-600 leading-relaxed"
          >
            <p>
              FastBite was born from a simple idea: to bring delicious, high-quality food 
              to your doorstep without the long wait. Founded in 2020, our journey began 
              in a small kitchen with big dreams and even bigger flavors.
            </p>
            
            <p>
              What started as a local favorite quickly grew into a beloved brand, thanks 
              to our commitment to using only the freshest ingredients and our passion for 
              creating mouth-watering dishes that keep our customers coming back for more.
            </p>
            
            <p>
              Today, FastBite serves hundreds of happy customers every day, offering a 
              diverse menu that ranges from sizzling BBQs to refreshing drinks, from 
              traditional desi flavors to modern fast food favorites.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-orange-50 rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To deliver joy through delicious food, made with love and served with a smile, 
                ensuring every bite brings happiness to our customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-orange-50 rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To become Pakistan's most loved food delivery brand, known for quality, 
                taste, and exceptional customer service.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaLeaf className="text-orange-500 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Fresh Ingredients</h4>
                <p className="text-sm text-gray-500">We never compromise on quality</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaTruck className="text-orange-500 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Fast Delivery</h4>
                <p className="text-sm text-gray-500">Hot & fresh at your doorstep</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaStar className="text-orange-500 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Customer First</h4>
                <p className="text-sm text-gray-500">Your satisfaction is our priority</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-3xl text-orange-500" />
                </div>
                <h4 className="font-semibold text-gray-800">Chef Ahmed</h4>
                <p className="text-sm text-gray-500">Head Chef</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-3xl text-orange-500" />
                </div>
                <h4 className="font-semibold text-gray-800">Sarah Khan</h4>
                <p className="text-sm text-gray-500">Operations Manager</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-3xl text-orange-500" />
                </div>
                <h4 className="font-semibold text-gray-800">Ali Raza</h4>
                <p className="text-sm text-gray-500">Customer Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;