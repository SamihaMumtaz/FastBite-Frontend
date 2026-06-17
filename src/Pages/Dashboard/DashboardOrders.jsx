import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaCheckCircle, FaClock, FaTimesCircle, FaFilter, FaEye, FaCheck, FaStar, FaTrash, FaBan, FaExclamationTriangle, FaPlus, FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";

const DashboardOrders = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const updateOrdersState = (updatedAllOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedAllOrders));
    if (setOrders) {
      const userOrders = updatedAllOrders.filter(order => 
        order.userEmail === currentUser.email || order.customer?.email === currentUser.email
      );
      setOrders(userOrders);
      if (selectedOrder) {
        const updatedSelected = updatedAllOrders.find(o => o.orderId === selectedOrder.orderId);
        if (updatedSelected) {
          setSelectedOrder(updatedSelected);
        }
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusDetails = (status) => {
    switch(status) {
      case "completed":
        return { color: "bg-green-100 text-green-600", icon: <FaCheckCircle className="text-xs" />, label: "Completed" };
      case "pending":
        return { color: "bg-yellow-100 text-yellow-600", icon: <FaClock className="text-xs" />, label: "Pending" };
      case "cancelled":
        return { color: "bg-red-100 text-red-600", icon: <FaTimesCircle className="text-xs" />, label: "Cancelled" };
      default:
        return { color: "bg-gray-100 text-gray-600", icon: null, label: status || "Pending" };
    }
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => (order.status || "pending").toLowerCase() === filterStatus);

  const getStatusCount = (status) => {
    if (status === "all") return orders.length;
    return orders.filter(order => (order.status || "pending").toLowerCase() === status).length;
  };

  const viewOrderDetails = (order) => {
    if (order.userEmail !== currentUser.email && order.customer?.email !== currentUser.email) {
      toast.error("You don't have permission to view this order");
      return;
    }
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleEditItem = (item) => {
    if (selectedOrder.status !== "pending") {
      toast.error("Only pending orders can be edited");
      return;
    }
    setEditingItem(item);
    setEditQuantity(item.quantity);
  };

  const handleSaveQuantity = () => {
    if (editQuantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderIndex = allOrders.findIndex(order => 
      order.orderId === selectedOrder.orderId && 
      (order.userEmail === currentUser.email || order.customer?.email === currentUser.email)
    );
    
    if (orderIndex !== -1) {
      const itemIndex = allOrders[orderIndex].items.findIndex(
        item => item._id === editingItem._id
      );
      
      if (itemIndex !== -1) {
        allOrders[orderIndex].items[itemIndex].quantity = editQuantity;
        allOrders[orderIndex].items[itemIndex].total = editingItem.price * editQuantity;
        
        allOrders[orderIndex].totalAmount = allOrders[orderIndex].items.reduce(
          (sum, item) => sum + (item.price * item.quantity), 0
        );
        
        updateOrdersState(allOrders);
        toast.success("Quantity updated successfully!");
        setEditingItem(null);
        setEditQuantity(1);
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    if (selectedOrder.status !== "pending") {
      toast.error("Only pending orders can be edited");
      return;
    }
    
    if (window.confirm("Remove this item from order?")) {
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const orderIndex = allOrders.findIndex(order => 
        order.orderId === selectedOrder.orderId && 
        (order.userEmail === currentUser.email || order.customer?.email === currentUser.email)
      );
      
      if (orderIndex !== -1) {
        allOrders[orderIndex].items = allOrders[orderIndex].items.filter(
          item => item._id !== itemId
        );
        
        allOrders[orderIndex].totalAmount = allOrders[orderIndex].items.reduce(
          (sum, item) => sum + (item.price * item.quantity), 0
        );
        
        updateOrdersState(allOrders);
        toast.success("Item removed from order");
      }
    }
  };

  const handleCompleteOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderIndex = allOrders.findIndex(order => 
      order.orderId === orderId && 
      (order.userEmail === currentUser.email || order.customer?.email === currentUser.email)
    );
    
    if (orderIndex === -1) {
      toast.error("Order not found");
      return;
    }
    
    if (allOrders[orderIndex].status !== "pending") {
      toast.error("Only pending orders can be completed");
      return;
    }
    
    const updatedOrders = [...allOrders];
    updatedOrders[orderIndex] = { 
      ...updatedOrders[orderIndex], 
      status: "completed", 
      completedAt: new Date().toISOString() 
    };
    
    updateOrdersState(updatedOrders);
    
    toast.success("Order completed! Thank you for shopping with us.");
    
    if (showDetails && selectedOrder?.orderId === orderId) {
      setSelectedOrder(updatedOrders[orderIndex]);
    }
  };

  const handleCancelOrder = () => {
    if (!orderToCancel) return;
    
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderIndex = allOrders.findIndex(order => 
      order.orderId === orderToCancel.orderId && 
      (order.userEmail === currentUser.email || order.customer?.email === currentUser.email)
    );
    
    if (orderIndex === -1) {
      toast.error("Order not found");
      setShowCancelConfirm(false);
      return;
    }
    
    if (allOrders[orderIndex].status !== "pending") {
      toast.error("Only pending orders can be cancelled");
      setShowCancelConfirm(false);
      return;
    }
    
    const updatedOrders = [...allOrders];
    updatedOrders[orderIndex] = { ...updatedOrders[orderIndex], status: "cancelled", cancelledAt: new Date().toISOString() };
    
    updateOrdersState(updatedOrders);
    
    toast.success("Order cancelled successfully");
    setShowCancelConfirm(false);
    setOrderToCancel(null);
    
    if (showDetails && selectedOrder?.orderId === orderToCancel.orderId) {
      setSelectedOrder(updatedOrders[orderIndex]);
    }
  };

  const handleDeleteOrder = () => {
    if (!orderToDelete) return;
    
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = allOrders.filter(order => order.orderId !== orderToDelete.orderId);
    
    updateOrdersState(updatedOrders);
    
    toast.success("Order deleted successfully");
    
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
    if (showDetails) {
      setShowDetails(false);
      setSelectedOrder(null);
    }
  };

  const confirmCancel = (order) => {
    setOrderToCancel(order);
    setShowCancelConfirm(true);
  };

  const confirmDelete = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const handleRateAndReview = (orderId) => {
    setSelectedOrder(orders.find(o => o.orderId === orderId));
    setShowRating(true);
  };

  const submitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderIndex = allOrders.findIndex(order => 
      order.orderId === selectedOrder.orderId && 
      (order.userEmail === currentUser.email || order.customer?.email === currentUser.email)
    );
    
    if (orderIndex !== -1) {
      const updatedOrders = [...allOrders];
      updatedOrders[orderIndex] = { 
        ...updatedOrders[orderIndex], 
        rating: rating, 
        review: review,
        reviewedAt: new Date().toISOString()
      };
      
      updateOrdersState(updatedOrders);
      
      toast.success("Thank you for your review");
      setShowRating(false);
      setRating(0);
      setReview("");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Orders</h2>
        <div className="text-center py-8">
          <FaShoppingBag className="text-5xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">You haven't placed any orders yet</p>
          <Link to="/mega-menu" className="text-orange-500 mt-2 inline-block">
            Browse Menu →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
          
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterStatus("all")} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filterStatus === "all" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
              <FaFilter className="text-xs inline mr-1" /> All ({getStatusCount("all")})
            </button>
            <button onClick={() => setFilterStatus("pending")} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filterStatus === "pending" ? "bg-yellow-500 text-white" : "bg-yellow-50 text-yellow-600"}`}>
              Pending ({getStatusCount("pending")})
            </button>
            <button onClick={() => setFilterStatus("completed")} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filterStatus === "completed" ? "bg-green-500 text-white" : "bg-green-50 text-green-600"}`}>
              Completed ({getStatusCount("completed")})
            </button>
            <button onClick={() => setFilterStatus("cancelled")} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filterStatus === "cancelled" ? "bg-red-500 text-white" : "bg-red-50 text-red-600"}`}>
              Cancelled ({getStatusCount("cancelled")})
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No {filterStatus} orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusDetails = getStatusDetails(order.status);
              
              return (
                <div key={order.orderId} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex flex-wrap justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-800">Order {order.orderId}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusDetails.color}`}>
                      {statusDetails.icon} {statusDetails.label}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {(order.items || []).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>Rs {item.price * item.quantity}</span>
                      </div>
                    ))}
                    {(order.items || []).length > 2 && (
                      <p className="text-xs text-gray-400">+ {(order.items || []).length - 2} more items</p>
                    )}
                  </div>

                  <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-orange-500">Rs {order.totalAmount}</span>
                  </div>

                  {order.status === "completed" && order.rating && (
                    <div className="mt-2 flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <FaStar key={star} className={`text-xs ${star <= order.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">Your rating</span>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-3">
                    <button onClick={() => viewOrderDetails(order)} className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                      <FaEye className="text-xs" /> View Details
                    </button>
                    
                    {order.status === "pending" && (
                      <>
                        <button onClick={() => handleCompleteOrder(order.orderId)} className="text-sm text-green-500 hover:text-green-600 font-medium flex items-center gap-1">
                          <FaCheck className="text-xs" /> Complete Order
                        </button>
                        <button onClick={() => confirmCancel(order)} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                          <FaBan className="text-xs" /> Cancel Order
                        </button>
                      </>
                    )}
                    
                    {order.status === "completed" && (
                      <>
                        {!order.rating && (
                          <button onClick={() => handleRateAndReview(order.orderId)} className="text-sm text-yellow-500 hover:text-yellow-600 font-medium flex items-center gap-1">
                            <FaStar className="text-xs" /> Rate & Review
                          </button>
                        )}
                        <button onClick={() => confirmDelete(order)} className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1">
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </>
                    )}
                    
                    {order.status === "cancelled" && (
                      <button onClick={() => confirmDelete(order)} className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1">
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowDetails(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-white hover:text-gray-200 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">{selectedOrder.orderId}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Order Date</p>
                <p>{formatDate(selectedOrder.orderDate)}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusDetails(selectedOrder.status).color}`}>
                  {getStatusDetails(selectedOrder.status).label}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Payment Method</p>
                <p>{selectedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Delivery Address</p>
                <p>{selectedOrder.delivery ? `${selectedOrder.delivery.address}, ${selectedOrder.delivery.city}` : `${selectedOrder.address}, ${selectedOrder.city}`}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Items</p>
                <div className="space-y-2 mt-2">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div key={idx} className="border rounded-lg p-3">
                      {editingItem?._id === item._id ? (
                        <div className="space-y-2">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setEditQuantity(Math.max(1, editQuantity - 1))}
                              className="p-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="font-semibold w-12 text-center">{editQuantity}</span>
                            <button
                              onClick={() => setEditQuantity(editQuantity + 1)}
                              className="p-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                            <span className="text-sm text-gray-500">
                              = Rs {item.price * editQuantity}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={handleSaveQuantity}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-sm text-gray-500">Price: Rs {item.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">Rs {item.price * item.quantity}</p>
                            {selectedOrder.status === "pending" && (
                              <div className="flex gap-2 mt-1">
                                <button
                                  onClick={() => handleEditItem(item)}
                                  className="text-xs text-blue-500 hover:text-blue-600"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleRemoveItem(item._id)}
                                  className="text-xs text-red-500 hover:text-red-600"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-orange-500">Rs {selectedOrder.totalAmount}</span>
              </div>

              <div className="mt-6 pt-4 border-t flex flex-wrap gap-3 justify-end">
                {selectedOrder.status === "pending" && (
                  <>
                    <button onClick={() => { handleCompleteOrder(selectedOrder.orderId); setShowDetails(false); }} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2">
                      <FaCheck /> Complete Order
                    </button>
                    <button onClick={() => { confirmCancel(selectedOrder); setShowDetails(false); }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                      <FaBan /> Cancel Order
                    </button>
                  </>
                )}
                
                {selectedOrder.status === "completed" && !selectedOrder.rating && (
                  <button onClick={() => { setShowRating(true); setShowDetails(false); }} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2">
                    <FaStar /> Rate & Review
                  </button>
                )}
                
                {(selectedOrder.status === "cancelled" || selectedOrder.status === "completed") && (
                  <button onClick={() => { setShowDetails(false); confirmDelete(selectedOrder); }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                    <FaTrash /> Delete Order
                  </button>
                )}
                
                <button onClick={() => setShowDetails(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCancelConfirm && orderToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowCancelConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 text-white rounded-t-2xl flex items-center gap-3">
              <FaExclamationTriangle className="text-2xl" />
              <h3 className="text-xl font-bold">Cancel Order</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-2">Are you sure you want to cancel this order?</p>
              <p className="text-sm text-gray-500 mb-4">Order ID: {orderToCancel.orderId}</p>
              <div className="flex gap-3">
                <button onClick={handleCancelOrder} className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2">
                  <FaBan /> Yes, Cancel
                </button>
                <button onClick={() => setShowCancelConfirm(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">
                  No, Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white rounded-t-2xl flex items-center gap-3">
              <FaExclamationTriangle className="text-2xl" />
              <h3 className="text-xl font-bold">Delete Order</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-2">Permanently delete this order?</p>
              <p className="text-sm text-gray-500 mb-4">Order ID: {orderToDelete.orderId}</p>
              <div className="flex gap-3">
                <button onClick={handleDeleteOrder} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2">
                  <FaTrash /> Yes, Delete
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRating && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowRating(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white rounded-t-2xl">
              <h3 className="text-xl font-bold">Rate & Review</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">How was your experience with Order {selectedOrder.orderId}?</p>
              <div className="flex justify-center gap-2 mb-6">
                {[1,2,3,4,5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                    <FaStar className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`} />
                  </button>
                ))}
              </div>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review here..." rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4" />
              <div className="flex gap-3">
                <button onClick={submitReview} className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                  Submit Review
                </button>
                <button onClick={() => { setShowRating(false); setRating(0); setReview(""); }} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardOrders;