import React, { useState, useEffect, useRef } from "react";
import aboutImg from "../../assets/productimg/about.png";
import founder from "../../assets/productimg/Team/ali.jpg";
import { ShoppingBagIcon, HeartIcon, TruckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const About = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
          } else {
            setAnimate(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-6 lg:px-24">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
        <div
          className={`lg:w-1/2 flex justify-center bg-gray-50 rounded-2xl p-4
            transition-all duration-700 ease-out
            ${animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <img
            src={aboutImg}
            alt="food"
            className="w-full max-w-xl object-cover rounded-xl"
          />
        </div>

        <div
          className={`lg:w-1/2 transition-all duration-700 ease-out delay-200
            ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <button className="bg-orange-100 text-orange-600 px-5 py-1 rounded-full font-medium mb-4">
              About Us
            </button>
          </Link>

          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-800">
            Fast, Fresh & Delivered
          </h2>
          <div className="w-16 h-1 bg-orange-500 mb-6 rounded-full"></div>

          <p className="mb-8 text-gray-600 leading-relaxed">
            We bring your favorite meals right to you — hot, fresh, and full of flavor.
            From quick snacks to full meals, our delivery ensures top-quality food prepared
            with care and delivered with speed.
          </p>

          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <ShoppingBagIcon className="w-10 h-10 text-orange-500 mb-3" />
              <h3 className="font-bold text-gray-800 mb-1">Fresh Meals</h3>
              <p className="text-gray-500 text-sm">Premium ingredients</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <HeartIcon className="w-10 h-10 text-orange-500 mb-3" />
              <h3 className="font-bold text-gray-800 mb-1">Healthy Option</h3>
              <p className="text-gray-500 text-sm">Nutritious selections</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <TruckIcon className="w-10 h-10 text-orange-500 mb-3" />
              <h3 className="font-bold text-gray-800 mb-1">Quick Delivery</h3>
              <p className="text-gray-500 text-sm">Fast & reliable</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <img
              src={founder}
              className="w-14 h-14 rounded-full object-cover"
              alt="founder"
            />
            <div>
              <h4 className="font-bold text-gray-800">Marley Culhane</h4>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;