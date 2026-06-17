import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useCart } from "../../Components/Context/CartContext";
import DashboardSidebar from "./DashboardSidebar";
import DashboardOverview from "./DashboardOverview";
import DashboardOrders from "./DashboardOrders";
import DashboardProfile from "./DashboardProfile";
import DashboardAddress from "./DashboardAddress";

const Dashboard = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const loadUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }

    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.email || userData.isAdmin) {
      navigate("/login");
      return false;
    }
    
    setUser(userData);
    return true;
  };

  const loadOrders = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const userOrders = allOrders.filter(order => 
      order.userEmail === userData.email || 
      order.customer?.email === userData.email
    );
    setOrders(userOrders);
  };

  useEffect(() => {
    if (loadUserData()) {
      loadOrders();
    }
  }, [navigate]);

  useEffect(() => {
    const handleOrderUpdate = () => {
      loadOrders();
    };
    
    window.addEventListener("orderUpdated", handleOrderUpdate);
    window.addEventListener("userLoggedIn", () => {
      loadUserData();
      loadOrders();
    });
    window.addEventListener("userLoggedOut", () => {
      setUser(null);
      setOrders([]);
    });
    
    return () => {
      window.removeEventListener("orderUpdated", handleOrderUpdate);
      window.removeEventListener("userLoggedIn", handleOrderUpdate);
      window.removeEventListener("userLoggedOut", handleOrderUpdate);
    };
  }, []);

  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    cartItems: cartItems.length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-22">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome, {user?.fullName || user?.name || "User"}!
          </h1>
          <p className="opacity-90 mt-2">Manage your orders, profile and more</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <DashboardSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            user={user}
            stats={stats}
          />

          <div className="lg:w-3/4">
            {activeTab === "overview" && (
              <DashboardOverview stats={stats} orders={orders} setOrders={setOrders} />
            )}
            {activeTab === "orders" && (
              <DashboardOrders orders={orders} setOrders={setOrders} />
            )}
            {activeTab === "profile" && (
              <DashboardProfile user={user} setUser={setUser} />
            )}
            {activeTab === "address" && (
              <DashboardAddress user={user} setUser={setUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;