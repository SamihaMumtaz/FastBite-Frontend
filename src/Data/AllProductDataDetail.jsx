import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaPlus, FaMinus, FaShoppingCart, FaClock, FaFire, FaCheckCircle, FaTruck, FaLeaf, FaTag, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../Components/Context/CartContext";
import toast from "react-hot-toast";
import AllProductData from "../Data/AllProductData";

const AllProductDataDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const found = AllProductData.find(
      (i) => i.type === "Item" && i._id.toString() === id
    );
    if (found) {
      setItem(found);
      setMainImage(found.img?.[0] || "");
    }
  }, [id]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAddedToCart(true);
    toast.success(`${item?.name} added to cart!`, {
      duration: 2000,
    });
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleOrderNow = () => {
    addToCart(item, quantity);
    navigate("/cart");
  };

  if (!item) return <h1 className="text-center text-3xl mt-20">Item Not Found</h1>;

  const galleryImages = item.img?.length ? item.img : [];
  const totalPrice = item.price * quantity;

  return (
    <div className="w-full min-h-screen bg-[rgb(255,243,224)] mt-22">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span>Back to Menu</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-8 bg-gray-50">
              <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg">
                <img
                  src={mainImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {item.specialCategory && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <FaFire className="text-xs" />
                    <span>{item.specialCategory}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                      mainImage === img
                        ? "border-orange-500 shadow-md scale-105"
                        : "border-gray-200 hover:border-orange-300 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${item.name}-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-orange-500 font-semibold uppercase tracking-wide bg-orange-50 px-3 py-1 rounded-full">
                  {item.mainCategory}
                </span>
                {item.subCategory && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{item.subCategory}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {item.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((star) => (
                    <FaStar key={star} className={`text-sm ${
                      star <= (item.rating || 4) ? 'text-yellow-400' : 'text-gray-200'
                    }`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({item.reviews || 231} reviews)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {item.description || `Experience the perfect blend of flavors with our freshly made ${item.name}. 
                Prepared with the finest ingredients, every bite offers a delightful taste that will leave 
                you craving more. Ideal for a hearty meal or a quick snack.`}
              </p>

              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaClock className="text-orange-500" />
                  <span>{item.deliveryTime || "20-30"} min</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaTruck className="text-orange-500" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaLeaf className="text-orange-500" />
                  <span>Fresh</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-700 font-semibold text-lg mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleDecrease}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-2xl font-semibold text-gray-800 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                <div>
                  {item.oldPrice && (
                    <span className="text-gray-400 text-lg line-through mr-2">Rs {item.oldPrice}</span>
                  )}
                  <span className="text-3xl font-bold text-orange-500">Rs {item.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-sm">Total Amount</span>
                  <p className="text-2xl font-bold text-orange-500">Rs {totalPrice}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`relative overflow-hidden flex-1 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 hover:bg-gray-900 text-white"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <FaCheckCircle className="text-sm" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="text-sm" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleOrderNow}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex-1 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Order Now
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaLeaf className="text-orange-500 text-sm" />
                  </div>
                  <p className="text-xs text-gray-500">Fresh Ingredients</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaTruck className="text-orange-500 text-sm" />
                  </div>
                  <p className="text-xs text-gray-500">Fast Delivery</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaTag className="text-orange-500 text-sm" />
                  </div>
                  <p className="text-xs text-gray-500">Best Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductDataDetail;