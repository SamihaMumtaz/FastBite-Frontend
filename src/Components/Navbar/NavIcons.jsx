import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaSignOutAlt, FaUserCircle, FaClipboardList, FaHome } from "react-icons/fa";
import { useCart } from "../Context/CartContext";

const NavIcons = () => {
  const navigate = useNavigate();
  const { getTotalItems, cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  let totalItems = 0;
  try {
    const items = getTotalItems();
    totalItems = typeof items === 'number' ? items : 0;
  } catch {
    totalItems = 0;
  }

  if (!cartItems || cartItems.length === 0) {
    totalItems = 0;
  }

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      
      if (token && userData && Object.keys(userData).length > 0) {
        setIsLoggedIn(true);
        setUser(userData);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setDropdownOpen(false);
      }
    };
    
    checkLoginStatus();
    
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("userLoggedIn", checkLoginStatus);
    window.addEventListener("userLoggedOut", checkLoginStatus);
    
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("userLoggedIn", checkLoginStatus);
      window.removeEventListener("userLoggedOut", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");
    
    window.dispatchEvent(new Event("userLoggedOut"));
    
    setDropdownOpen(false);
    
    navigate("/logout");
  };

  const getUserName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  const getAvatarLetter = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      <Link to="/cart" className="relative group">
        <div className="relative">
          <FaShoppingCart className="text-2xl text-gray-700 group-hover:text-orange-500 cursor-pointer transition-all duration-300 transform group-hover:scale-110" />
          <span className="absolute -top-2 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        </div>
      </Link>

      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{getAvatarLetter()}</span>
            </div>
            <span>{getUserName()}</span>
            <svg className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {getAvatarLetter()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{getUserName()}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <Link
                  to="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                >
                  <FaUserCircle className="text-lg" />
                  <span>My Profile</span>
                </Link>
                
                <Link
                  to="/dashboard?tab=orders"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                >
                  <FaClipboardList className="text-lg" />
                  <span>My Orders</span>
                </Link>
                
                <Link
                  to="/cart"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>My Cart</span>
                  {totalItems > 0 && (
                    <span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link
                  to="/"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                >
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </Link>

                <div className="border-t my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <FaUserAlt className="text-sm" />
          <span>Account</span>
        </Link>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NavIcons;