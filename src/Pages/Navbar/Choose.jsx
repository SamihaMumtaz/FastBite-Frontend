import React from 'react';
import { FaTruck, FaLeaf, FaTag, FaClock, FaStar, FaFire } from 'react-icons/fa';

const Choose = () => {
  const features = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: "Fast Delivery",
      description: "Hot and fresh meals delivered in minimum time without delays."
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Fresh Ingredients",
      description: "We use high-quality ingredients to ensure rich taste and freshness."
    },
    {
      icon: <FaTag className="text-3xl" />,
      title: "Affordable Prices",
      description: "Premium food that fits your budget — without compromising quality."
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "24/7 Service",
      description: "Order anytime, day or night. We're always here to serve you."
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Top Rated",
      description: "Rated 4.8/5 by thousands of happy customers."
    },
    {
      icon: <FaFire className="text-3xl" />,
      title: "Hot & Fresh",
      description: "Every meal is prepared fresh and delivered hot."
    }
  ];

  return (
    <section className="py-16 px-6 lg:px-24 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose FastBite?</h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          We're committed to providing the best food delivery experience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 p-6 cursor-pointer"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all duration-300">
              <div className="text-orange-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Choose;