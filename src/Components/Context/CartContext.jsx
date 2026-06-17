import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserCartKey = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userEmail = user?.email || "guest";
    return `cart_${userEmail}`;
  };

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartKey = getUserCartKey();
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        setCartItems([]);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadCart();

    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith("cart_")) {
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const cartKey = getUserCartKey();
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
      } catch (error) {
      }
    }
  }, [cartItems, isLoaded]);

  useEffect(() => {
    const checkUserChange = () => {
      const cartKey = getUserCartKey();
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener("userLoggedIn", checkUserChange);
    window.addEventListener("userLoggedOut", checkUserChange);
    
    return () => {
      window.removeEventListener("userLoggedIn", checkUserChange);
      window.removeEventListener("userLoggedOut", checkUserChange);
    };
  }, []);

  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem._id === item._id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem._id === item._id
            ? { 
                ...cartItem, 
                quantity: cartItem.quantity + quantity,
                totalPrice: (cartItem.quantity + quantity) * cartItem.price
              }
            : cartItem
        );
      } else {
        return [...prevItems, { 
          ...item, 
          quantity: quantity,
          totalPrice: item.price * quantity
        }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const removeMultipleFromCart = (itemIds) => {
    if (!itemIds || itemIds.length === 0) return;
    setCartItems(prevItems => prevItems.filter(item => !itemIds.includes(item._id)));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId
          ? { 
              ...item, 
              quantity: newQuantity,
              totalPrice: item.price * newQuantity
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    const cartKey = getUserCartKey();
    localStorage.removeItem(cartKey);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSummary = () => {
    return {
      items: cartItems,
      totalItems: getTotalItems(),
      totalAmount: getCartTotal(),
      itemCount: cartItems.length
    };
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      removeMultipleFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getTotalItems,
      getCartSummary
    }}>
      {children}
    </CartContext.Provider>
  );
};