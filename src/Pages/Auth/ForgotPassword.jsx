import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  EnvelopeIcon, 
  KeyIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0); 
  const [isLocked, setIsLocked] = useState(false);
  
  const otpToastId = useRef(null);
  const timerInterval = useRef(null);
  const lockoutInterval = useRef(null);

  useEffect(() => {
    const savedLockout = localStorage.getItem("otp_lockout");
    if (savedLockout) {
      const lockoutData = JSON.parse(savedLockout);
      const remainingTime = Math.max(0, Math.floor((lockoutData.expiry - Date.now()) / 1000));
      if (remainingTime > 0) {
        setLockoutTime(remainingTime);
        setIsLocked(true);
        startLockoutTimer(remainingTime);
      } else {
        localStorage.removeItem("otp_lockout");
        localStorage.removeItem("otp_resend_count");
        setResendCount(0);
      }
    }
    
    const savedResendCount = localStorage.getItem("otp_resend_count");
    if (savedResendCount && !isLocked) {
      setResendCount(parseInt(savedResendCount));
    }
  }, []);

  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      lockoutInterval.current = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            clearInterval(lockoutInterval.current);
            setIsLocked(false);
            setResendCount(0);
            localStorage.removeItem("otp_lockout");
            localStorage.removeItem("otp_resend_count");
            toast.success("Lockout period ended! You can now request OTP again.", {
              duration: 5000,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (lockoutInterval.current) {
        clearInterval(lockoutInterval.current);
      }
    };
  }, [isLocked, lockoutTime]);

  const clearTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatLockoutTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  };

  const showOtpToast = (otpCode, expirySeconds, isResend = false) => {
    if (otpToastId.current) {
      toast.dismiss(otpToastId.current);
      otpToastId.current = null;
    }
    
    clearTimer();
    
    otpToastId.current = toast(
      (t) => (
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
            <KeyIcon className="w-6 h-6 text-orange-500" />
          </div>
          <p className="font-bold text-gray-800 mb-1">
            {isResend ? "New OTP Code" : "Your OTP Code"}
          </p>
          <p className="text-3xl font-mono tracking-wider font-bold text-orange-600 my-2">{otpCode}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <ClockIcon className="w-3 h-3" />
            <span>Expires in: <span id="toast-timer">{formatTime(expirySeconds)}</span></span>
          </div>
          <p className="text-xs text-orange-500 mt-2">
            Resends left: {3 - resendCount}
          </p>
        </div>
      ),
      {
        duration: expirySeconds * 1000,
        id: "otp-toast",
        style: {
          background: '#fff',
          color: '#333',
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          padding: '16px',
          minWidth: '280px',
          border: '1px solid #f97316'
        },
        icon: false
      }
    );
  };

  const startTimer = (initialSeconds) => {
    clearTimer();
    
    let currentSeconds = initialSeconds;
    
    timerInterval.current = setInterval(() => {
      currentSeconds--;
      setOtpExpiryTime(currentSeconds);
      
      const timerElement = document.getElementById("toast-timer");
      if (timerElement) {
        timerElement.innerText = formatTime(currentSeconds);
      }
      
      if (currentSeconds <= 0) {
        clearTimer();
        toast.error("OTP has expired! Please request a new one.", {
          duration: 5000,
        });
        setOtpExpiryTime(0);
      }
    }, 1000);
  };

  const startLockoutTimer = (seconds) => {
    if (lockoutInterval.current) {
      clearInterval(lockoutInterval.current);
    }
    
    lockoutInterval.current = setInterval(() => {
      setLockoutTime(prev => {
        if (prev <= 1) {
          clearInterval(lockoutInterval.current);
          setIsLocked(false);
          setResendCount(0);
          localStorage.removeItem("otp_lockout");
          localStorage.removeItem("otp_resend_count");
          toast.success("Lockout period ended! You can now request OTP again.", {
            duration: 5000,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (isLocked) {
      toast.error(`Too many attempts! Please try again after ${formatLockoutTime(lockoutTime)}`, {
        duration: 5000,
      });
      return;
    }

    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(u => u.email === email) || email === "user@example.com";

    if (!userExists) {
      toast.error("No account found with this email");
      setLoading(false);
      return;
    }

    setResendCount(0);
    clearTimer();
    localStorage.removeItem("otp_resend_count");

    const otpCode = generateOTP();
    
    const expiryTime = Date.now() + 10 * 60 * 1000;
    const otpData = {
      code: otpCode,
      email: email,
      expiry: expiryTime
    };
    localStorage.setItem("resetOTP", JSON.stringify(otpData));
    
    setOtpExpiryTime(600);
    showOtpToast(otpCode, 600, false);
    startTimer(600);
    
    setStep(2);
    setLoading(false);
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    const storedOTPData = localStorage.getItem("resetOTP");
    if (!storedOTPData) {
      toast.error("OTP expired. Please request again");
      handleBack();
      return;
    }

    const otpData = JSON.parse(storedOTPData);
    
    if (Date.now() > otpData.expiry) {
      toast.error("OTP has expired! Please request a new OTP.", {
        duration: 5000,
      });
      localStorage.removeItem("resetOTP");
      handleBack();
      return;
    }

    if (otp === otpData.code) {
      if (otpToastId.current) {
        toast.dismiss(otpToastId.current);
        otpToastId.current = null;
      }
      clearTimer();
      
      toast.success("OTP verified successfully!");
      setStep(3);
      setOtpExpiryTime(0);
      setResendCount(0);
      localStorage.removeItem("otp_resend_count");
    } else {
      toast.error("Invalid OTP. Please try again");
    }
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("resetOTP");
    localStorage.removeItem("otp_resend_count");
    localStorage.removeItem("otp_lockout");
    
    toast.success("Password reset successful! Please login with your new password.");
    
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (isLocked) {
      toast.error(`Too many resend attempts! Please try again after ${formatLockoutTime(lockoutTime)}`, {
        duration: 5000,
      });
      return;
    }
    
    if (resendCount >= 3) {
      const lockoutExpiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("otp_lockout", JSON.stringify({ expiry: lockoutExpiry }));
      setIsLocked(true);
      setLockoutTime(86400);
      startLockoutTimer(86400);
      
      toast.error("Maximum resend attempts reached! You can request OTP again after 24 hours.", {
        duration: 8000,
      });
      return;
    }
    
    const otpCode = generateOTP();
    
    const expiryTime = Date.now() + 10 * 60 * 1000;
    const otpData = {
      code: otpCode,
      email: email,
      expiry: expiryTime
    };
    localStorage.setItem("resetOTP", JSON.stringify(otpData));
    
    const newResendCount = resendCount + 1;
    setResendCount(newResendCount);
    localStorage.setItem("otp_resend_count", newResendCount.toString());
    
    setOtpExpiryTime(600);
    clearTimer();
    showOtpToast(otpCode, 600, true);
    startTimer(600);
    
    const remainingResends = 3 - newResendCount;
    toast.success(`New OTP sent! ${remainingResends} resend${remainingResends === 1 ? '' : 's'} remaining`);
  };

  const handleBack = () => {
    if (otpToastId.current) {
      toast.dismiss(otpToastId.current);
      otpToastId.current = null;
    }
    clearTimer();
    setStep(1);
    setOtpExpiryTime(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white mt-22">
      <Toaster position="top-center" />
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-md w-full">
        
        {isLocked && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-red-700">Account Temporarily Locked</p>
                <p className="text-xs text-red-600">
                  Too many OTP attempts. Try again in: <span className="font-bold">{formatLockoutTime(lockoutTime)}</span>
                </p>
              </div>
            </div>
          </div>
        )}
        
        {step === 1 && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <LockClosedIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your email and we'll send you an OTP
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <KeyIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Enter OTP</h2>
            <p className="text-gray-600 text-center mb-2">
              We've sent a 6-digit OTP to <strong>{email}</strong>
            </p>
            <p className="text-xs text-gray-500 text-center mb-4">
              Check the toast notification for OTP and timer
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                <p className="text-xs text-yellow-700">
                  Demo Mode: OTP appears in toast | Valid for 10 min | Max 3 resends | 24h lockout after 3 resends
                </p>
              </div>
            </div>
            
            {resendCount > 0 && (
              <div className="text-center mb-4">
                <span className="text-xs text-orange-600 font-medium">
                  Resends used: {resendCount}/3
                </span>
              </div>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <LockClosedIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Create New Password</h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your new password for <strong>{email}</strong>
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <div className="relative mb-4">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isLocked ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={loading || isLocked}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : isLocked ? `Locked (${formatLockoutTime(lockoutTime)})` : "Send OTP"}
            </button>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-blue-700">
                  Demo Mode: Use email <strong>user@example.com</strong> | OTP valid for 10 minutes | Max 3 resends
                </p>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="relative mb-4">
              <KeyIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-xl tracking-wider"
                placeholder="Enter 6-digit OTP"
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Verify OTP
            </button>
            <div className="text-center mt-4">
              <button
                onClick={handleResendOTP}
                disabled={resendCount >= 3 || isLocked}
                className={`text-sm ${
                  resendCount < 3 && !isLocked
                    ? 'text-orange-500 hover:text-orange-600' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLocked 
                  ? `Locked (${formatLockoutTime(lockoutTime)})` 
                  : resendCount >= 3 
                    ? 'Max resends reached - 24h lockout' 
                    : `Resend OTP (${3 - resendCount} remaining)`}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">New Password</label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter new password"
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

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Confirm new password"
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

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </>
        )}

        <p className="text-center mt-4">
          <Link to="/login" className="text-orange-500 hover:text-orange-600">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;