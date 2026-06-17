import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaHamburger, FaUtensils, FaIceCream, FaCoffee, FaCocktail, 
  FaBirthdayCake, FaBreadSlice, FaDrumstickBite, FaLeaf, 
  FaArrowRight, FaStar, FaClock, FaFire, FaChevronRight 
} from "react-icons/fa";
import AllProductData from "../../Data/AllProductData";

const FoodMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const loadCategories = () => {
      setLoading(true);
      const foodMenuCategories = AllProductData.filter(
        (item) => item.showInFoodMenu && item.type === "Category"
      );
      setCategories(foodMenuCategories);
      setLoading(false);
    };
    
    loadCategories();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.key]);

  const getCategoryUrl = (categoryName) => {
    const categoryMap = {
      "Fast Food": "/mega-menu?category=fast-food",
      "Desi Food": "/mega-menu?category=desi-food",
      "Snacks": "/mega-menu?category=snacks",
      "Drinks": "/mega-menu?category=drinks",
      "Shakes": "/mega-menu?category=shakes",
      "Desserts": "/mega-menu?category=desserts",
      "Bakery": "/mega-menu?category=bakery",
      "BBQ": "/mega-menu?category=bbq",
    };
    return categoryMap[categoryName] || "/mega-menu?category=all";
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "Fast Food": <FaHamburger />,
      "Desi Food": <FaUtensils />,
      "Snacks": <FaLeaf />,
      "Drinks": <FaCoffee />,
      "Shakes": <FaCocktail />,
      "Desserts": <FaIceCream />,
      "Bakery": <FaBreadSlice />,
      "BBQ": <FaDrumstickBite />
    };
    return iconMap[categoryName] || <FaUtensils />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-22">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[rgb(255,243,224)] min-h-screen mt-22">
      
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
              <FaFire className="text-orange-500 text-sm" />
              <span className="text-orange-600 text-sm font-medium">Delicious Collection</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
          >
            Food Menu
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Discover a world of flavors with our carefully curated categories, made with love and the finest ingredients
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-gray-600 text-sm">🍔 50+ Items</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-gray-600 text-sm">⭐ 4.8 Rating</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-gray-600 text-sm">🚚 Fast Delivery</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={ref} className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Choose Your Favorite
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            From sizzling BBQs to refreshing drinks, explore our diverse range of culinary delights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const categoryUrl = getCategoryUrl(category.name);
            const isHovered = hoveredCard === category._id;
            
            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredCard(category._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer"
              >
                <Link to={categoryUrl} className="block h-full">
                  <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={category.img?.[0]}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      <div className="absolute top-4 right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-orange-500 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {getCategoryIcon(category.name)}
                      </div>
                      
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-xs" />
                          <span className="text-white text-xs font-medium">4.8 ★</span>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm line-clamp-1">
                          {category.description || "Fresh & delicious items"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <FaClock className="text-orange-500" />
                            <span>20-30 min</span>
                          </div>
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <FaFire className="text-orange-500" />
                            <span>Hot & Fresh</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`flex items-center justify-between pt-3 border-t border-gray-100 transition-all duration-300 ${isHovered ? 'gap-2' : ''}`}>
                        <span className="text-gray-600 font-medium">Explore Now</span>
                        <div className={`w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                          <FaChevronRight className="text-sm" />
                        </div>
                      </div>
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/mega-menu">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto">
              View Complete Menu
              <FaArrowRight className="text-sm" />
            </button>
          </Link>
        </div>
      </div>

      <section className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">100% Fresh</h3>
              <p className="text-sm text-gray-500">Quality ingredients</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-500">30 min delivery</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Best Quality</h3>
              <p className="text-sm text-gray-500">Premium taste</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaFire className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hot & Fresh</h3>
              <p className="text-sm text-gray-500">Made to order</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodMenu;