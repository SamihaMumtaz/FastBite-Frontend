import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendar, FaUser, FaArrowRight, FaClock } from "react-icons/fa";
import CurvedBG from "../../assets/productimg/curved.png";
import food from "../../assets/productimg/food.png";
import health from "../../assets/productimg/health.jpeg"
import bbq from "../../assets/productimg/bbq.jpeg"
import burger from "../../assets/productimg/burger.jpeg";
import ingredients from "../../assets/productimg/ingredients.webp"
import mealprep from "../../assets/productimg/mealprep.jpg"
import trends from "../../assets/productimg/trends.jpeg"

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Healthy Eating",
      excerpt: "Discover simple ways to make your meals healthier without sacrificing taste...",
      image: health,
      date: "June 10, 2026",
      author: "Chef Ahmed",
      category: "Health",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Secret to Perfect BBQ",
      excerpt: "Master the art of grilling with these pro tips and techniques...",
      image: bbq,
      date: "June 8, 2026",
      author: "Chef Ahmed",
      category: "Cooking Tips",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Best Fast Food Combinations",
      excerpt: "Try these amazing flavor combinations that will blow your mind...",
      image: burger,
      date: "June 5, 2026",
      author: "Sarah Khan",
      category: "Fast Food",
      readTime: "3 min read",
    },
    {
      id: 4,
      title: "Seasonal Ingredients Guide",
      excerpt: "Learn what's fresh and in season to make the most delicious meals...",
      image: ingredients,
      date: "June 1, 2026",
      author: "Ali Raza",
      category: "Ingredients",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "5 Minutes Meal Prep Ideas",
      excerpt: "Quick and easy meal prep ideas for busy professionals...",
      image: mealprep,
      date: "May 28, 2026",
      author: "Chef Ahmed",
      category: "Quick Meals",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Food Trends to Watch in 2026",
      excerpt: "Stay ahead with the latest food trends and innovations...",
      image: trends,
      date: "May 25, 2026",
      author: "Sarah Khan",
      category: "Trends",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-white mt-22">
      <img src={CurvedBG} alt="background" className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full opacity-40 pointer-events-none select-none" />
      <img src={food} alt="Food" className="absolute top-0 right-0 w-[250px] sm:w-[300px] md:w-[430px] pointer-events-none select-none opacity-80" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Our Blog</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Stories, tips, and inspiration from our kitchen</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><FaCalendar /> {post.date}</span>
                    <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><FaClock /> {post.readTime}</span>
                    <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1">
                      Read More <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;