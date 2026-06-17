import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import ali from "../../assets/productimg/Team/ali.jpg";
import sara from "../../assets/productimg/Team/sara.jpg";
import hamza from "../../assets/productimg/Team/hamza.jpg";
import areeba from "../../assets/productimg/Team/areeba.jpg";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";

const teamMembers = [
  {
    name: "Ali Khan",
    role: "Founder & CEO",
    image: ali,
    social: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Sara Ahmed",
    role: "Head Chef",
    image: sara,
    social: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Hamza Malik",
    role: "Marketing Manager",
    image: hamza,
    social: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Areeba Shah",
    role: "Customer Support Lead",
    image: areeba,
    social: { facebook: "#", instagram: "#", twitter: "#" },
  },
];

const OurTeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-white mt-22">
      <img
        src={CurvedBG}
        alt="background"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full opacity-40 pointer-events-none select-none"
      />
      <img
        src={food}
        alt="Food"
        className="absolute top-0 right-0 w-[250px] sm:w-[300px] md:w-[430px] pointer-events-none select-none opacity-80"
      />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Our Team</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Meet the passionate people behind FastBite who make every meal special
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-orange-400"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex gap-4 text-gray-700 text-xl">
                <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaFacebook />
                </a>
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaInstagram />
                </a>
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaTwitter />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Our Team</h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate people to join the FastBite family. If you love food and want to make a difference, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">careers@fastbite.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">+92 300 1234567</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeamPage;