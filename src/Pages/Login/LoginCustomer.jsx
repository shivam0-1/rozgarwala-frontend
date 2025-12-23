import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../api/auth.api";
import { saveAuth } from "../../utils/authStorage";
import useAuth from "../../auth/useAuth";


const LoginCustomer = () => {
  const navigate = useNavigate();
   const { login } = useAuth(); 

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= LOGIN HANDLER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.emailOrPhone,
        password: formData.password,
        role: "customer",
      };

      const res = await loginUser(payload);

      saveAuth({
        token: res.token,
        role: res.role,
      });
      await login();

      // ✅ Redirect to profile (NOT "/")
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl border p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#E53935]">Customer Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Hire skilled workers near you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email or Mobile Number
            </label>
            <input
              name="emailOrPhone"
              placeholder="Enter email or phone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E53935]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E53935]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-[#E53935] font-medium">
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-[#E53935] text-white py-2.5 rounded-full font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login as Customer
          </motion.button>
        </form>

        {/* Switch */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Want to earn money?{" "}
          <Link to="/loginworker" className="text-[#E53935] font-semibold">
            Login as Worker
          </Link>
        </div>

        <div className="mt-2 text-center text-sm">
          New user?{" "}
          <Link to="/signupcustomer" className="text-[#E53935] font-semibold">
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginCustomer;
