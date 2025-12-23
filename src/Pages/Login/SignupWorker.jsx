import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import { registerUser } from "../../api/auth.api";
import { saveAuth } from "../../utils/authStorage";
import { useNavigate } from "react-router-dom";


const SKILLS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Cleaner",
  "Painter",
  "Mason",
  "AC Repair",
  "Mechanic",
  "Gardener",
  "Cook",
  "Driver",
  "Tutor",
  "Nurse",
  "Baby Sitter",
  "Laundry",
  "Interior Designer",
  "Beauty Services",
  "Home Appliance Repair",
  "Other",
];

const InputField = ({ label, required, helper, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      required={required}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E53935]"
    />
    {helper && <p className="text-xs text-gray-400">{helper}</p>}
  </div>
);

const SignupWorker = ({ onSignup }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    role: "worker",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    skill: [],
    rate: "",
    experienceYear: "",
    location: {
      city: "",
      pincode: "",
    },
  });

  const handleSkillSelect = (selectedSkill) => {
    setFormData((prev) => ({
      ...prev,
      skill: [selectedSkill], // ONLY ONE SKILL
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skill") {
      setFormData((prev) => ({
        ...prev,
        skill: value.split(",").map((s) => s.trim()),
      }));
    } else if (name === "city" || name === "pincode") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await registerUser(formData);
    saveAuth(res);
    navigate("/loginworker");
  } catch (err) {
    alert(err.response?.data?.message || "Worker registration failed");
  }

   onSignup?.(formData);
};



 

  const SkillChips = ({ selectedSkill, onSelect }) => (
    <div className="flex flex-wrap gap-2">
      {SKILLS.map((skill) => {
        const isSelected = selectedSkill === skill;

        return (
          <button
            key={skill}
            type="button"
            onClick={() => onSelect(skill)}
            className={`px-3 py-1.5 rounded-full text-sm border transition
            ${
              isSelected
                ? "bg-[#E53935] text-white border-[#E53935]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#E53935]"
            }
          `}
          >
            {skill}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 border"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#E53935]">
            Worker Registration
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Get hired for jobs near your area
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              required
              autoComplete="given-name"
            />

            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              required
              autoComplete="family-name"
            />
          </div>

          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <InputField
            label="Mobile Number"
            name="phone"
            placeholder="10-digit mobile number"
            onChange={handleChange}
            required
            autoComplete="tel"
          />

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              required
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E53935]"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Select Skill <span className="text-red-500">*</span>
            </label>

            <SkillChips
              selectedSkill={formData.skill[0]}
              onSelect={handleSkillSelect}
            />

            {!formData.skill.length && (
              <p className="text-xs text-gray-400">
                Please select one skill you specialize in
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Daily Rate (₹)"
              name="rate"
              placeholder="e.g. 800"
              onChange={handleChange}
              required
            />

            <InputField
              label="Experience (Years)"
              name="experienceYear"
              placeholder="e.g. 5"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="City"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />

            <InputField
              label="Pincode"
              name="pincode"
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
                placeholder="Create a strong password"
                onChange={handleChange}
                required
                autoComplete="new-password"
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
              Minimum 8 characters recommended
            </p>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-4 bg-[#E53935] text-white py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <UserPlus size={18} />
            Register as Worker
          </motion.button>
        </form>

        {/* Switch Role */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Looking to hire workers?{" "}
          <Link to="/signupcustomer" className="text-[#E53935] font-semibold">
            Register as Customer
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupWorker;
