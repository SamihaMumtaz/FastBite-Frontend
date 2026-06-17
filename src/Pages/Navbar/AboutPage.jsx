import React, { useEffect } from "react";
import aboutImg from "../../assets/productimg/aboutus.png";
import About from "../../Components/Home/About";
import Choose from "./Choose";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(255,243,224)] mt-22">
      <div className="relative z-10">
        <div className="w-full">
          <About />
        </div>

        <section className="py-16 px-6 lg:px-24 text-center bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed">
              To deliver fresh, tasty, and affordable meals with speed and reliability — making every order feel like a premium dining experience. We aim to become the most trusted food delivery brand for families, students, and professionals.
            </p>
          </div>
        </section>

        <section className="w-full px-6 lg:px-24 py-16 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
              <div className="w-16 h-1 bg-orange-500 mb-6 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                FastBite is your go-to destination for delicious meals delivered quickly and safely. We bring restaurant-quality food right to your doorstep with unmatched freshness and flavor.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From everyday cravings to special treats, we make sure each meal feels special. Our team works round the clock to provide reliable, fast, and premium delivery services — because your time and taste matter.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={aboutImg} 
                alt="About FastBite" 
                className="w-80 drop-shadow-lg rounded-xl bg-gray-50 p-4" 
              />
            </div>
          </div>
        </section>

        <Choose />
      </div>
    </div>
  );
};

export default AboutPage;