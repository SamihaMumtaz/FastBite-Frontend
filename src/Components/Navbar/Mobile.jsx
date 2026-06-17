import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaSignOutAlt, FaUserCircle, FaClipboardList, FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useCart } from "../Context/CartContext";

const Mobile = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const current = location.pathname;
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const linkClasses = (path) =>
    current === path
      ? "text-[rgb(245,130,32)] block py-2"
      : "hover:text-[rgb(245,130,32)] block py-2";

  const scrollTop = () => window.scrollTo(0, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");
    window.dispatchEvent(new Event("userLoggedOut"));
    setOpen(false);
    navigate("/logout");
  };

  const getUserName = () => {
    if (user?.fullName) return user.fullName.split(' ')[0];
    if (user?.name) return user.name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  const getAvatarLetter = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  if (!open) return null;

  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 max-h-[80vh] overflow-y-auto">
      <ul className="flex flex-col p-4 space-y-2">
        <li className={linkClasses("/")}>
          <Link to="/" onClick={() => { scrollTop(); setOpen(false); }}>Home</Link>
        </li>
        <li className={linkClasses("/food-menu")}>
          <Link to="/food-menu" onClick={() => { scrollTop(); setOpen(false); }}>Menu</Link>
        </li>
        <li className={linkClasses("/mega-menu")}>
          <Link to="/mega-menu" onClick={() => { scrollTop(); setOpen(false); }}>Items</Link>
        </li>
        <li className={linkClasses("/about")}>
          <Link to="/about" onClick={() => { scrollTop(); setOpen(false); }}>About</Link>
        </li>
        <li className={linkClasses("/contact")}>
          <Link to="/contact" onClick={() => { scrollTop(); setOpen(false); }}>Contact</Link>
        </li>

        <li className="border-t pt-2 mt-2">
          <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-orange-500 py-2">
            <FaShoppingCart className="text-xl" />
            <span>My Cart</span>
            {totalItems > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className="bg-orange-50 rounded-lg p-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  {getAvatarLetter()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{getUserName()}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </li>

            <li>
              <Link 
                to="/dashboard" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 hover:text-orange-500 py-2"
              >
                <FaUserCircle className="text-lg" />
                <span>My Profile</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard?tab=orders" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 hover:text-orange-500 py-2"
              >
                <FaClipboardList className="text-lg" />
                <span>My Orders</span>
              </Link>
            </li>

            <li className="border-t mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 py-2 px-3 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="border-t pt-2 mt-2">
              <Link 
                to="/login" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-4 py-2 hover:from-orange-600 hover:to-orange-700 transition"
              >
                <FaSignInAlt className="text-lg" />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                onClick={() => setOpen(false)} 
                className="flex items-center gap-3 border-2 border-orange-500 text-orange-500 rounded-lg px-4 py-2 hover:bg-orange-50 transition"
              >
                <FaUserPlus className="text-lg" />
                <span>Sign Up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Mobile;