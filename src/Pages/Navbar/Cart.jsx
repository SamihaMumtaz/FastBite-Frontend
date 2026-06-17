import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../Components/Context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaCheckCircle, FaRegCircle, FaPlusCircle } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  React.useEffect(() => {
    const newSelected = {};
    cartItems.forEach(item => {
      newSelected[item._id] = selectedItems[item._id] || false;
    });
    setSelectedItems(newSelected);
  }, [cartItems]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelected = {};
    cartItems.forEach(item => {
      newSelected[item._id] = newSelectAll;
    });
    setSelectedItems(newSelected);
  };

  const getSelectedItems = () => {
    return cartItems.filter(item => selectedItems[item._id]);
  };

  const getSelectedTotal = () => {
    return getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getSelectedCount = () => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSelected = () => {
    const selected = getSelectedItems();
    if (selected.length === 0) {
      alert("Please select at least one item to order!");
      return;
    }
    
    navigate("/ordernow", { 
      state: { 
        cartItems: selected,
        totalAmount: getSelectedTotal(),
        isPartialOrder: true
      } 
    });
  };

  const handleOrderAll = () => {
    if (cartItems.length === 0) return;
    
    navigate("/ordernow", { 
      state: { 
        cartItems: cartItems,
        totalAmount: getCartTotal(),
        isPartialOrder: false
      } 
    });
  };

  const handleRemoveSelected = () => {
    const selectedIds = getSelectedItems().map(item => item._id);
    selectedIds.forEach(id => removeFromCart(id));
    setSelectAll(false);
  };

  const handleAddMoreItems = () => {
    navigate("/mega-menu");
  };

  const handleContinueShopping = () => {
    navigate(-1); 
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-22">
        <div className="text-center">
          <FaShoppingBag className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Add some delicious items to your cart!</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/mega-menu")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Browse Items
            </button>
            <button
              onClick={() => navigate("/food-menu")}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold"
            >
              View Food Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedItemsList = getSelectedItems();
  const hasSelectedItems = selectedItemsList.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-22">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 px-6 py-3 font-semibold text-gray-700">
                <div className="col-span-1 text-center">
                  <button onClick={toggleSelectAll} className="focus:outline-none">
                    {selectAll ? (
                      <FaCheckCircle className="text-orange-500 text-xl" />
                    ) : (
                      <FaRegCircle className="text-gray-400 text-xl hover:text-orange-500" />
                    )}
                  </button>
                </div>
                <div className="col-span-4">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border-t first:border-t-0 border-gray-200 transition-all duration-300 ${
                    selectedItems[item._id] ? 'bg-orange-50' : ''
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
                    <div className="md:col-span-1 flex justify-center">
                      <button
                        onClick={() => toggleItemSelection(item._id)}
                        className="focus:outline-none"
                      >
                        {selectedItems[item._id] ? (
                          <FaCheckCircle className="text-orange-500 text-xl" />
                        ) : (
                          <FaRegCircle className="text-gray-400 text-xl hover:text-orange-500" />
                        )}
                      </button>
                    </div>
                    
                    <div className="md:col-span-4 flex gap-4">
                      <img 
                        src={item.img?.[0]} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">by Healthy Feast Corner</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 text-sm mt-2 hover:text-red-700 flex items-center gap-1"
                        >
                          <FaTrash className="text-xs" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden font-semibold mr-2">Price:</span>
                      Rs {item.price}
                    </div>
                    
                    <div className="md:col-span-3 flex items-center justify-center gap-3">
                      <span className="md:hidden font-semibold mr-2">Qty:</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="font-semibold min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    
                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden font-semibold mr-2">Total:</span>
                      <span className="font-bold text-orange-500">
                        Rs {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={handleRemoveSelected}
                disabled={!hasSelectedItems}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  hasSelectedItems 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Remove Selected ({getSelectedItems().length})
              </button>
              
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-semibold px-4 py-2"
              >
                Clear All Cart
              </button>

              <button
                onClick={handleAddMoreItems}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <FaPlusCircle /> Add More Items
              </button>
            </div>

            <div className="mt-4 text-center md:text-left">
              <button
                onClick={handleContinueShopping}
                className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              {hasSelectedItems && (
                <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Selected Items:</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedItemsList.map((item) => (
                      <div key={item._id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>Rs {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-orange-200 mt-2 pt-2 flex justify-between font-bold">
                    <span>Selected Total:</span>
                    <span className="text-orange-500">Rs {getSelectedTotal()}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>All Items:</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                </div>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>Rs {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Cart Total:</span>
                  <span className="text-orange-500">Rs {getCartTotal()}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Shipping: Calculated at checkout
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleOrderSelected}
                  disabled={!hasSelectedItems}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    hasSelectedItems
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Order Selected ({getSelectedCount()} items)
                </button>
                
                <button
                  onClick={handleOrderAll}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Order All ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;