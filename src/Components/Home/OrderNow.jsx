import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../Context/CartContext";

const OrderNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeMultipleFromCart } = useCart();
  
  const selectedItem = location.state?.selectedItem || null;
  const cartItemsFromState = location.state?.cartItems || [];
  const totalAmountFromCart = location.state?.totalAmount || 0;
  
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  
  const isMultiItem = cartItemsFromState.length > 0;
  const items = isMultiItem ? cartItemsFromState : (selectedItem ? [selectedItem] : []);
  
  const calculateTotalAmount = () => {
    if (isMultiItem) return totalAmountFromCart;
    if (selectedItem) {
      const quantity = selectedItem?.quantity || 1;
      const price = selectedItem?.price || 0;
      return price * quantity;
    }
    return 0;
  };
  
  const totalAmount = calculateTotalAmount();

  const [billing, setBilling] = useState({
    fullName: currentUser?.fullName || currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: "",
    city: "",
    paymentMethod: "cod",
    accountNumber: "",
    accountName: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const validatePaymentDetails = () => {
    if (billing.paymentMethod === "online") {
      if (!billing.accountNumber) {
        toast.error("Please enter account number!");
        return false;
      }
      if (!billing.accountName) {
        toast.error("Please enter account holder name!");
        return false;
      }
    }
    return true;
  };

  const saveAddressToUserProfile = (address, city) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    const newAddress = {
      id: Date.now(),
      address: address,
      city: city,
      isDefault: false
    };
    
    let existingAddresses = user.addresses || [];
    
    const addressExists = existingAddresses.some(
      addr => addr.address === address && addr.city === city
    );
    
    if (!addressExists) {
      existingAddresses.push(newAddress);
      
      const updatedUser = {
        ...user,
        addresses: existingAddresses
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!billing.fullName || !billing.phone || !billing.address || !billing.city) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!validatePaymentDetails()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const orderId = "#" + Math.floor(Math.random() * 1000000);
      
      const addressSaved = saveAddressToUserProfile(billing.address, billing.city);
      
      const orderDetails = {
        orderId: orderId,
        items: items.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          total: (item.price || 0) * (item.quantity || 1)
        })),
        totalAmount: totalAmount,
        orderDate: new Date().toLocaleString(),
        orderTimestamp: Date.now(),
        status: "pending",
        paymentMethod: billing.paymentMethod,
        customer: {
          fullName: billing.fullName,
          phone: billing.phone,
          email: currentUser?.email || "guest@example.com"
        },
        delivery: {
          address: billing.address,
          city: billing.city
        },
        userEmail: currentUser?.email || "guest@example.com"
      };
            
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.unshift(orderDetails);
      localStorage.setItem("orders", JSON.stringify(orders));
      
      const orderedItemIds = items.map(item => item._id);
      if (orderedItemIds.length > 0) {
        removeMultipleFromCart(orderedItemIds);
      }
      
      toast.success(
        `Order Placed Successfully! Order ID: ${orderId} | Total: Rs ${totalAmount}`,
        {
          duration: 4000,
          position: "top-center",
        }
      );
      
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
      
      setLoading(false);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-16 bg-gray-50 mt-22">
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-center">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-3xl shadow-xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
            Place Your Order
          </h2>
          <p className="text-center text-gray-500 mb-6">Complete your order details below</p>

          {items.length > 0 && (
            <div className="mb-6 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {isMultiItem ? "Your Order Items:" : "Order Summary:"}
              </h3>
              
              <div className="space-y-2">
                {items.map((item, idx) => {
                  const quantity = item.quantity || 1;
                  const itemTotal = (item.price || 0) * quantity;
                  
                  return (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-gray-500 ml-2">× {quantity}</span>
                      </div>
                      <p className="font-semibold text-orange-600">Rs {itemTotal}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-3 pt-3 border-t border-orange-200 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total Amount:</span>
                <span className="text-xl font-bold text-orange-500">Rs {totalAmount}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={billing.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="03XX-XXXXXXX"
                value={billing.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Delivery Address *</label>
              <textarea
                name="address"
                placeholder="House No, Street, Area, Landmark"
                value={billing.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">This address will be saved to your profile</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">City *</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={billing.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Method *</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-orange-50 transition-colors flex-1">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={billing.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-orange-50 transition-colors flex-1">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={billing.paymentMethod === "online"}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <span className="font-medium">Online Payment</span>
                </label>
              </div>
            </div>

            {billing.paymentMethod === "online" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 border-t pt-4 mt-2"
              >
                <h3 className="text-md font-semibold text-gray-800">Bank Account Details</h3>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Account Number *</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter bank account number"
                    value={billing.accountNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Account Holder Name *</label>
                  <input
                    type="text"
                    name="accountName"
                    placeholder="As per bank account"
                    value={billing.accountName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600">
                    You will receive payment instructions via SMS/Email after order confirmation
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full mt-8 transition-all shadow-md hover:shadow-lg w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Order...
              </span>
            ) : (
              `Place Order - Rs ${totalAmount}`
            )}
          </motion.button>

          <p className="text-center text-xs text-gray-400 mt-4">
            By placing this order, you agree to our terms and conditions
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default OrderNow;