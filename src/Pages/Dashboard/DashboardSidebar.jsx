import React from "react";
import { Link } from "react-router-dom";
import { 
  FaUser, FaSignOutAlt, FaShoppingBag, 
  FaHome, FaMapMarkerAlt, FaClipboardList
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = ({ activeTab, setActiveTab, user, stats }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/logout");
    }, 500);
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <FaUser className="text-orange-500 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user?.fullName || user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "overview" 
                ? "bg-orange-50 text-orange-500" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaHome className="text-lg" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "orders" 
                ? "bg-orange-50 text-orange-500" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaClipboardList className="text-lg" />
            <span>My Orders</span>
            {stats.totalOrders > 0 && (
              <span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                {stats.totalOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "profile" 
                ? "bg-orange-50 text-orange-500" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaUser className="text-lg" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("address")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "address" 
                ? "bg-orange-50 text-orange-500" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaMapMarkerAlt className="text-lg" />
            <span>Addresses</span>
          </button>

          <Link to="/cart">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <FaShoppingBag className="text-lg" />
              <span>My Cart</span>
              {stats.cartItems > 0 && (
                <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.cartItems}
                </span>
              )}
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4 pt-4 border-t"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;