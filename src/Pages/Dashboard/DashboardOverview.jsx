import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBox, FaCreditCard, FaShoppingBag, 
  FaCheckCircle, FaStar, FaStarHalfAlt, FaRegStar
} from "react-icons/fa";

const DashboardOverview = ({ stats, orders, setOrders }) => {
  
  useEffect(() => {
    const refreshOrders = () => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const userOrders = allOrders.filter(order => 
        order.userEmail === userData.email || order.customer?.email === userData.email
      );
      if (setOrders) {
        setOrders(userOrders);
      }
    };
    
    window.addEventListener("orderUpdated", refreshOrders);
    return () => window.removeEventListener("orderUpdated", refreshOrders);
  }, [setOrders]);

  const completedOrders = orders.filter(o => o.status === "completed");
  
  const completedStats = {
    totalOrders: completedOrders.length,
    totalSpent: completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    totalItems: completedOrders.reduce((sum, order) => sum + (order.items?.length || 0), 0),
  };

  const recentOrders = [...completedOrders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5);

  const renderStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-sm" />);
      }
    }
    return stars;
  };

  const ratedOrders = completedOrders.filter(o => o.rating && o.rating > 0);
  const averageRating = ratedOrders.length > 0 
    ? (ratedOrders.reduce((sum, o) => sum + (o.rating || 0), 0) / ratedOrders.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed Orders</p>
              <p className="text-2xl font-bold text-gray-800">{completedStats.totalOrders}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-orange-500">Rs {completedStats.totalSpent}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaCreditCard className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Cart Items</p>
              <p className="text-2xl font-bold text-gray-800">{stats.cartItems}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <FaShoppingBag className="text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Items Ordered</p>
              <p className="text-2xl font-bold text-purple-500">{completedStats.totalItems}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <FaBox className="text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
            <p className="text-sm text-gray-600">Completed Orders</p>
            <p className="text-2xl font-bold text-green-600">{completedStats.totalOrders}</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="flex justify-center mb-2">{renderStars(averageRating)}</div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-orange-600">{averageRating}</p>
            <p className="text-xs text-gray-400 mt-1">({ratedOrders.length} ratings)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Completed Orders</h2>
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No completed orders yet</p>
            <Link to="/mega-menu" className="text-orange-500 mt-2 inline-block">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order, idx) => {
              const orderRating = order.rating || 0;
              return (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-semibold text-gray-800">Order {order.orderId}</p>
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full flex items-center gap-1">
                          <FaCheckCircle className="text-xs" /> Completed
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{order.orderDate}</p>
                      <p className="text-sm mt-1">
                        {order.items?.length || 0} item(s) - Rs {order.totalAmount}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {renderStars(orderRating)}
                        {orderRating > 0 && (
                          <span className="text-xs text-gray-500 ml-1">({orderRating})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link to="/mega-menu">
            <button className="w-full py-3 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition">
              Order Food
            </button>
          </Link>
          <Link to="/cart">
            <button className="w-full py-3 bg-gray-50 text-gray-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;