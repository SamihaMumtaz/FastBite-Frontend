import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaHome, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const LogoutPage = () => {

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");
    
    
    window.dispatchEvent(new Event("userLoggedOut"));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-white">
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

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-100 text-center">
            
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3">Logged Out Successfully</h2>
            
            <p className="text-gray-600 mb-4">
              You have been successfully logged out of your account.
            </p>
            
            <p className="text-gray-500 text-sm mb-8">
              Thank you for visiting FastBite. We hope to see you again soon!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/login" className="flex-1">
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  <FaArrowLeft className="w-4 h-4" />
                  Login Again
                </button>
              </Link>
              
              <Link to="/" className="flex-1">
                <button className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-3 rounded-xl hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  <FaHome className="w-4 h-4" />
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;