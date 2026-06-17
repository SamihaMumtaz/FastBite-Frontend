import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaClock, FaArrowRight, FaLeaf, FaTruck, FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/productimg/logo.png";

const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = () => {
        if (!email) {
            toast.error("Please enter an email address!");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            toast.success("Subscribed successfully!");
            setEmail("");
            setIsLoading(false);
        }, 1000);
    };

    const handleLogoClick = () => {
        window.scrollTo(0, 0);
        window.location.href = '/';
    };

    const footerLinks = {
        about: [
            { name: "About Us", path: "/about" },
            { name: "Our Story", path: "/our-story" },
            { name: "Careers", path: "/team" },
        ],
        company: [
            { name: "Our Team", path: "/team" },
            { name: "FAQs", path: "/faq" },
            { name: "Blog", path: "/blog" },
        ],
        support: [
            { name: "Help Center", path: "/help" },
            { name: "Contact Us", path: "/contact" },
            { name: "Privacy Policy", path: "/privacy" },
            { name: "Terms & Conditions", path: "/terms" },
        ],
    };

    return (
        <footer ref={ref} className="bg-[rgb(255,243,224)] pt-16 pb-8">
            <Toaster position="top-center" />
            <div className="container mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="mb-4">
                            <img
                                src={logo}
                                alt="FastBite Logo"
                                onClick={handleLogoClick}
                                className="cursor-pointer h-12 object-contain"
                            />
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Delivering flavor and joy at your doorstep. Fresh, fast, and delicious food made with love.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <FaLeaf className="text-orange-500" />
                                <span>100% Fresh</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <FaTruck className="text-orange-500" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <FaStar className="text-orange-500" />
                                <span>Best Quality</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <h3 className="font-semibold text-gray-800 text-lg mb-4">About</h3>
                        <ul className="space-y-3">
                            {footerLinks.about.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="font-semibold text-gray-800 text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        <h3 className="font-semibold text-gray-800 text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="font-semibold text-gray-800 text-lg mb-4">Get in Touch</h3>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaPhoneAlt className="text-orange-500 text-sm" />
                                <span>+92 300 1234567</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaEnvelope className="text-orange-500 text-sm" />
                                <span>support@fastbite.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaMapMarkerAlt className="text-orange-500 text-sm" />
                                <span>Lahore, Pakistan</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaClock className="text-orange-500 text-sm" />
                                <span>Daily: 10:00 AM - 11:00 PM</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            <a href="#" className="w-10 h-10 bg-orange-100 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaFacebook className="text-orange-500 hover:text-white text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-orange-100 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaInstagram className="text-orange-500 hover:text-white text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-orange-100 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaTwitter className="text-orange-500 hover:text-white text-lg" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-12 shadow-lg"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
                            <p className="text-orange-100">Get the latest offers, deals, and food updates directly in your inbox.</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <div className="flex flex-1 bg-white rounded-lg overflow-hidden shadow-lg">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="px-5 py-3 w-64 md:w-80 outline-none text-gray-700"
                                />
                                <button
                                    onClick={handleSubscribe}
                                    disabled={isLoading}
                                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Subscribe <FaArrowRight className="text-sm" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center text-gray-500 text-sm pt-6 border-t border-orange-200"
                >
                    <p>&copy; {new Date().getFullYear()} FastBite. All rights reserved. Made with <FaHeart className="inline text-red-500 text-xs" /> for food lovers.</p>
                    <div className="flex flex-wrap justify-center gap-4 mt-3">
                        <Link to="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/terms" className="hover:text-orange-500 transition">Terms of Service</Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/contact" className="hover:text-orange-500 transition">Contact Us</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;