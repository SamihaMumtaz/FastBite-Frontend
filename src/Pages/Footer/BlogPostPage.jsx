import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCalendar, FaUser, FaClock, FaArrowLeft, FaShare, FaHeart, 
  FaBookmark, FaArrowRight 
} from "react-icons/fa";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";
import health from "../../assets/productimg/health.jpeg"
import bbq from "../../assets/productimg/bbq.jpeg"
import burger from "../../assets/productimg/burger.jpeg";
import ingredients from "../../assets/productimg/ingredients.webp"
import mealprep from "../../assets/productimg/mealprep.jpg"
import trends from "../../assets/productimg/trends.jpeg"

const blogPosts = {
  1: {
    title: "10 Tips for Healthy Eating",
    image: health,
    date: "June 10, 2026",
    author: "Chef Ahmed",
    readTime: "5 min read",
    category: "Health",
    content: `
      <p>Eating healthy doesn't have to be complicated or boring. Here are 10 simple tips to help you maintain a balanced diet while still enjoying delicious food.</p>
      <h2>1. Start Your Day with Breakfast</h2>
      <p>A healthy breakfast provides energy for the day ahead. Include protein, whole grains, and fruits.</p>
      <h2>2. Stay Hydrated</h2>
      <p>Drink at least 8 glasses of water daily. Water helps with digestion, energy, and overall health.</p>
      <h2>3. Eat More Fruits and Vegetables</h2>
      <p>Aim for 5 servings of fruits and vegetables each day. They're packed with vitamins and minerals.</p>
      <h2>4. Choose Whole Grains</h2>
      <p>Switch to brown rice, whole wheat bread, and oatmeal for more fiber and nutrients.</p>
      <h2>5. Control Portion Sizes</h2>
      <p>Use smaller plates and pay attention to serving sizes to avoid overeating.</p>
      <h2>6. Limit Processed Foods</h2>
      <p>Choose fresh ingredients over packaged, processed options whenever possible.</p>
      <h2>7. Cook at Home More Often</h2>
      <p>Home cooking allows you to control ingredients and portions.</p>
      <h2>8. Plan Your Meals</h2>
      <p>Meal planning helps you make healthier choices and saves time.</p>
      <h2>9. Read Food Labels</h2>
      <p>Understand what's in your food by checking nutrition labels.</p>
      <h2>10. Enjoy Your Food</h2>
      <p>Take time to savor each bite. Mindful eating leads to better digestion and satisfaction.</p>
    `
  },
  2: {
    title: "The Secret to Perfect BBQ",
    image: bbq,
    date: "June 8, 2026",
    author: "Chef Ahmed",
    readTime: "4 min read",
    category: "Cooking Tips",
    content: `
      <p>Summer is here, and it's time to fire up the grill! Here's everything you need to know for perfect BBQ every time.</p>
      <h2>Choose the Right Meat</h2>
      <p>Select quality cuts with good marbling for juicier results. Chicken thighs work better than breasts for grilling.</p>
      <h2>Master the Marinade</h2>
      <p>Marinate meat for at least 2-4 hours (or overnight) to infuse flavor and tenderize.</p>
      <h2>Temperature Control</h2>
      <p>Use a meat thermometer to ensure perfect doneness: Chicken 165°F, Beef 145°F, Pork 145°F.</p>
      <h2>Let It Rest</h2>
      <p>Allow meat to rest for 5-10 minutes after grilling to lock in juices.</p>
      <h2>Don't Forget the Veggies</h2>
      <p>Grilled vegetables like corn, peppers, and zucchini make perfect side dishes.</p>
    `
  },
  3: {
    title: "Best Fast Food Combinations",
    image: burger,
    date: "June 5, 2026",
    author: "Sarah Khan",
    readTime: "3 min read",
    category: "Fast Food",
    content: `
      <p>Elevate your fast food experience with these incredible flavor combinations.</p>
      <h2>Burger + Onion Rings + Milkshake</h2>
      <p>The classic trio that never disappoints. Dip those onion rings in your milkshake for a sweet-salty treat!</p>
      <h2>Pizza + Garlic Sauce + Pepperoni</h2>
      <p>Add extra garlic sauce to your pepperoni pizza for an irresistible flavor boost.</p>
      <h2>Fries + Ice Cream</h2>
      <p>Don't knock it till you try it! The hot salty fries with cold sweet ice cream is amazing.</p>
      <h2>Chicken Wings + Blue Cheese + Celery</h2>
      <p>The perfect buffalo wing experience with cooling blue cheese dressing.</p>
    `
  },
  4: {
    title: "Seasonal Ingredients Guide",
    image: ingredients,
    date: "June 1, 2026",
    author: "Ali Raza",
    readTime: "6 min read",
    category: "Ingredients",
    content: `
      <p>Cooking with seasonal ingredients means better flavor, lower prices, and environmental benefits.</p>
      <h2>Spring (March-May)</h2>
      <p>Asparagus, peas, radishes, strawberries, artichokes, and fresh herbs.</p>
      <h2>Summer (June-August)</h2>
      <p>Tomatoes, corn, zucchini, bell peppers, berries, peaches, and watermelon.</p>
      <h2>Fall (September-November)</h2>
      <p>Pumpkin, squash, apples, pears, sweet potatoes, Brussels sprouts, and kale.</p>
      <h2>Winter (December-February)</h2>
      <p>Citrus fruits, root vegetables, cabbage, cauliflower, and winter squash.</p>
    `
  },
  5: {
    title: "5 Minutes Meal Prep Ideas",
    image: mealprep,
    date: "May 28, 2026",
    author: "Chef Ahmed",
    readTime: "4 min read",
    category: "Quick Meals",
    content: `
      <p>Short on time? These 5-minute meal prep ideas will save your week!</p>
      <h2>Overnight Oats</h2>
      <p>Combine oats, milk, yogurt, and toppings in a jar. Refrigerate overnight for instant breakfast.</p>
      <h2>Mason Jar Salads</h2>
      <p>Layer dressing, hearty vegetables, protein, and greens in a jar. Shake and eat when ready.</p>
      <h2>Sheet Pan Meals</h2>
      <p>Toss protein and vegetables with oil and seasonings. Roast on a single pan for easy cleanup.</p>
      <h2>Freezer Smoothie Packs</h2>
      <p>Pre-portion fruits and greens in freezer bags. Just add liquid and blend.</p>
    `
  },
  6: {
    title: "Food Trends to Watch in 2026",
    image: trends,
    date: "May 25, 2026",
    author: "Sarah Khan",
    readTime: "7 min read",
    category: "Trends",
    content: `
      <p>The culinary world is constantly evolving. Here are the top food trends for 2026.</p>
      <h2>Plant-Based Everything</h2>
      <p>More delicious meat alternatives and dairy-free options hitting the market.</p>
      <h2>Fusion Cuisine</h2>
      <p>Unexpected flavor combinations like Korean-Mexican and Japanese-Italian.</p>
      <h2>Fermented Foods</h2>
      <p>Kimchi, kombucha, and sourdough continue to gain popularity for gut health.</p>
      <h2>Sustainable Seafood</h2>
      <p>Consumers demanding responsibly sourced and traceable seafood options.</p>
      <h2>Ghost Kitchens</h2>
      <p>Delivery-only restaurants are changing how we experience food.</p>
    `
  }
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-22">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
          <p className="text-gray-500 mb-4">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-orange-500 hover:text-orange-600 font-semibold">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-white mt-22">
      <img src={CurvedBG} alt="background" className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full opacity-40 pointer-events-none select-none" />
      <img src={food} alt="Food" className="absolute top-0 right-0 w-[250px] sm:w-[300px] md:w-[430px] pointer-events-none select-none opacity-80" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6 transition-colors">
          <FaArrowLeft /> Back to Blog
        </button>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative h-96 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{post.category}</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
              <span className="flex items-center gap-1"><FaCalendar /> {post.date}</span>
              <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
              <span className="flex items-center gap-1"><FaClock /> {post.readTime}</span>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">Share this article:</span>
                <button className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group">
                  <FaShare className="text-orange-500 group-hover:text-white text-sm" />
                </button>
                <button className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors group">
                  <FaHeart className="text-orange-500 group-hover:text-white text-sm" />
                </button>
                <button className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group">
                  <FaBookmark className="text-orange-500 group-hover:text-white text-sm" />
                </button>
              </div>
              <Link to="/blog" className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                More Articles <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPostPage;