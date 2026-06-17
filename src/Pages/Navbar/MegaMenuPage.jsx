import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaStar, FaClock, FaFire, FaShoppingCart, FaLeaf, FaTruck, FaTag, FaCheckCircle, FaHamburger, FaUtensils, FaIceCream, FaCoffee, FaCocktail, FaBirthdayCake, FaBreadSlice, FaDrumstickBite, FaEye, FaArrowRight, FaSpinner } from "react-icons/fa";
import { useCart } from "../../Components/Context/CartContext";
import toast from "react-hot-toast";
import AllProductData from "../../Data/AllProductData";

const MegaMenuPage = () => {
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedItemId, setAddedItemId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "all", name: "All Items", icon: <FaTag className="text-sm" />, url: "/mega-menu?category=all" },
    { id: "Fast Food", name: "Fast Food", icon: <FaHamburger className="text-sm" />, url: "/mega-menu?category=fast-food" },
    { id: "Desi Food", name: "Desi Food", icon: <FaUtensils className="text-sm" />, url: "/mega-menu?category=desi-food" },
    { id: "Snacks", name: "Snacks", icon: <FaLeaf className="text-sm" />, url: "/mega-menu?category=snacks" },
    { id: "Drinks", name: "Drinks", icon: <FaCoffee className="text-sm" />, url: "/mega-menu?category=drinks" },
    { id: "Shakes", name: "Shakes", icon: <FaCocktail className="text-sm" />, url: "/mega-menu?category=shakes" },
    { id: "Desserts", name: "Desserts", icon: <FaIceCream className="text-sm" />, url: "/mega-menu?category=desserts" },
    { id: "Bakery", name: "Bakery", icon: <FaBreadSlice className="text-sm" />, url: "/mega-menu?category=bakery" },
    { id: "BBQ", name: "BBQ", icon: <FaDrumstickBite className="text-sm" />, url: "/mega-menu?category=bbq" },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      const categoryMap = {
        'fast-food': 'Fast Food',
        'desi-food': 'Desi Food',
        'snacks': 'Snacks',
        'drinks': 'Drinks',
        'shakes': 'Shakes',
        'desserts': 'Desserts',
        'bakery': 'Bakery',
        'bbq': 'BBQ'
      };
      const mappedCategory = categoryMap[categoryParam];
      if (mappedCategory) {
        setSelectedCategory(mappedCategory);
      }
    }
    
    const filteredItems = AllProductData.filter(
      (item) => item.showInMegaMenu 
    );
    setItems(filteredItems);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId, e) => {
    if (e.button === 1 || e.ctrlKey || e.metaKey) {
      return;
    }
    e.preventDefault();
    setSelectedCategory(categoryId);
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setLoading(false);
    }, 500);
  };

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => {
        if (item.mainCategory === selectedCategory) return true;
        if (item.categories && item.categories.includes(selectedCategory)) return true;
        return false;
      });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  if (!items.length) {
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
              <span className="text-orange-600 text-sm font-medium">Special Selection</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
          >
            Mega Menu
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
            Explore a world of flavors with our carefully crafted dishes, made with love and the finest ingredients
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => {
                const menuSection = document.getElementById('menu-section');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Explore Menu <FaArrowRight className="text-sm" />
            </button>
            <button
              onClick={() => navigate("/mega-menu?category=all")}
              className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md"
            >
              View All Items
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-200"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{items.length}+</p>
              <p className="text-xs text-gray-500">Delicious Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">30-40</p>
              <p className="text-xs text-gray-500">Minutes Delivery</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">100%</p>
              <p className="text-xs text-gray-500">Fresh Ingredients</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-22 z-20 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map(category => (
              <Link
                key={category.id}
                to={category.url}
                onClick={(e) => handleCategoryChange(category.id, e)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-orange-500 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="menu-section" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-500 mt-3">Handpicked just for you</p>
          {filteredItems.length > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              Showing {visibleItems.length} of {filteredItems.length} items
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              <Link 
                to={`/menu-item/${item._id}`}
                state={{ item }}
                className="block cursor-pointer"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={item.img?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {item.specialCategory && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <FaFire className="text-xs" />
                      <span>{item.specialCategory}</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-orange-500 font-semibold uppercase tracking-wide bg-orange-50 px-2 py-0.5 rounded">
                      {item.mainCategory}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {item.description || "Freshly prepared with premium ingredients to give you the best taste experience."}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <FaStar key={star} className={`text-xs ${
                          star <= (item.rating || 4) ? 'text-yellow-400' : 'text-gray-200'
                        }`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({item.reviews || 24} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div>
                      {item.oldPrice && (
                        <span className="text-gray-400 text-sm line-through mr-2">Rs {item.oldPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-orange-500">Rs {item.price}</span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/menu-item/${item._id}`, { state: { item } });
                        window.scrollTo({ top: 0, behavior: "instant" });
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <FaEye className="text-xs" />
                      <span>View Details</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 mt-3 pt-2 text-xs text-gray-400">
                    <FaClock className="text-xs" />
                    <span>Delivery in {item.deliveryTime || "20-30"} minutes</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-white" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Items</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
            <p className="text-sm text-gray-400 mt-3">
              Showing {visibleItems.length} of {filteredItems.length} items
            </p>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">No items available in {categories.find(c => c.id === selectedCategory)?.name} category</p>
            <Link
              to="/mega-menu?category=all"
              onClick={() => handleCategoryChange("all", new Event('click'))}
              className="mt-4 text-orange-500 font-semibold hover:text-orange-600 inline-block"
            >
              View all items →
            </Link>
          </div>
        )}
      </section>

      <section className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaLeaf className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Fresh Ingredients</h3>
              <p className="text-sm text-gray-500">100% fresh and quality ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTruck className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Quick delivery at your doorstep</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTag className="text-2xl text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Best Prices</h3>
              <p className="text-sm text-gray-500">Affordable prices with great taste</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MegaMenuPage;