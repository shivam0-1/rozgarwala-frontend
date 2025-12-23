import React, { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../api/auth.api";
import { saveAuth } from "../../utils/authStorage";

/* ================= INPUT FIELD ================= */
const InputField = ({ label, required, value, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      value={value}
      required={required}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition"
    />
  </div>
);



const SignupCustomer = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    location: {
      city: "",
      pincode: "",
    },
    password: "",
    role: "customer",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city" || name === "pincode") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting customer data:", formData);

    try {
      const res = await registerUser(formData);
      saveAuth(res);
      navigate("/logincustomer");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl border p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#E53935]">
            Create Customer Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Find trusted workers near your location
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter first name"
              onChange={handleChange}
              required
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter last name"
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            onChange={handleChange}
            required
          />

          <InputField
            label="Mobile Number"
            name="phone"
            value={formData.phone}
            placeholder="10-digit mobile number"
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E53935]"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="City"
              name="city"
              value={formData.location.city}
              placeholder="City"
              onChange={handleChange}
              required
            />

            <InputField
              label="Pincode"
              name="pincode"
              value={formData.location.pincode}
              placeholder="Area pincode"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Create a strong password"
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
            <p className="text-xs text-gray-400">
              Use at least 8 characters with letters & numbers
            </p>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-4 bg-[#E53935] text-white py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <UserPlus size={18} />
            Register as Customer
          </motion.button>
        </form>

        {/* Worker Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Want to earn money?{" "}
          <Link to="/signupworker" className="text-[#E53935] font-semibold">
            Register as a Worker
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupCustomer;
