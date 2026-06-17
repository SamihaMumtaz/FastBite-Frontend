import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, UserIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid phone number (10-13 digits)");
      return false;
    }
    
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(formData.password)) {
      toast.error("Password must contain uppercase, lowercase and number");
      return false;
    }
    
    if (!formData.confirmPassword) {
      toast.error("Please confirm your password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    
    if (!acceptTerms) {
      toast.error("You must accept the terms and conditions");
      return false;
    }
    
    return true;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(u => u.email === formData.email);
      
      if (existingUser) {
        toast.error("Email already registered");
        setLoading(false);
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name: formData.name,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        registeredAt: new Date().toISOString(),
        address: "",
        city: ""
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      toast.success("Registration successful! Please login to continue.");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 to-white">
      <Toaster position="top-center" />
      
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

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-100">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-500 mt-2">Join us for delicious food delivery</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <div className="relative">
                  <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="0300-1234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password *</label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="Create a password"
                  />
                  {showPassword ? (
                    <EyeSlashIcon
                      onClick={() => setShowPassword(false)}
                      className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 cursor-pointer hover:text-gray-600"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(true)}
                      className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 cursor-pointer hover:text-gray-600"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Must contain uppercase, lowercase and number (min 6 chars)</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password *</label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="Confirm your password"
                  />
                  {showConfirmPassword ? (
                    <EyeSlashIcon
                      onClick={() => setShowConfirmPassword(false)}
                      className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 cursor-pointer hover:text-gray-600"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowConfirmPassword(true)}
                      className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 cursor-pointer hover:text-gray-600"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-orange-500 hover:text-orange-600">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-orange-500 hover:text-orange-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                disabled={loading}
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;