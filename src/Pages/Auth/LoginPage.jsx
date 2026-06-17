import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import food from "../../assets/productimg/food.png";
import CurvedBG from "../../assets/productimg/curved.png";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user || (email === "user@example.com" && password === "password123")) {
        const userData = user || {
          name: "John Doe",
          fullName: "John Doe",
          email: email,
          phone: "0300-1234567",
          address: "123 Main Street",
          city: "Lahore",
          registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem("token", "dummy-token-" + Date.now());
        localStorage.setItem("user", JSON.stringify(userData));
        
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        window.dispatchEvent(new Event("userLoggedIn"));
        
        toast.success("Login successful! Redirecting...");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid email or password");
      }
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Please login to your account</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 transition-all"
                    placeholder="Enter your password"
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
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button
                disabled={loading}
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log In"
                )}
              </button>

              <p className="text-center text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-orange-500 font-semibold hover:text-orange-600">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;