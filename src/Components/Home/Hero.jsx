// Hero.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hero_bg from "../../assets/hero-bg.png";
import { FaCheckCircle, FaTag, FaHeadset } from "react-icons/fa";
import { useTranslation } from "react-i18next";

/* ================= SAME SERVICES AS NAVBAR ================= */
const SERVICES = [
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

const Feature = ({ Icon, title }) => (
  <div className="flex items-center gap-3 px-10 py-5 bg-white rounded-xl shadow-sm">
    <Icon className="text-gray-500 w-6 h-6" />
    <span className="text-gray-700 text-sm font-medium">{title}</span>
  </div>
);

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Show modal after 3s (every refresh)
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleHireWorker = () => {
    if (!service || !location) {
      alert("Please select service and enter city or pincode");
      return;
    }

    navigate(
      `/workers?skill=${encodeURIComponent(
        service
      )}&location=${encodeURIComponent(location)}`
    );

    // reset hero inputs
    setService("");
    setLocation("");
  };

  return (
    <>
      {/* ================= MODAL (UNCHANGED) ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
          {" "}
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-7 relative animate-scaleIn">
            {" "}
            {/* Close */}{" "}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              {" "}
              ✕{" "}
            </button>{" "}
            {/* Badge */}{" "}
            <div className="flex justify-center">
              {" "}
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-4 py-1 rounded-full">
                {" "}
                For Skilled Professionals{" "}
              </span>{" "}
            </div>{" "}
            {/* Title */}{" "}
            <h2 className="mt-4 text-2xl font-extrabold text-gray-900 text-center">
              {" "}
              Become a Worker{" "}
            </h2>{" "}
            {/* Description */}{" "}
            <p className="mt-3 text-center text-gray-600 leading-relaxed">
              {" "}
              Get direct calls from local customers, flexible work, and grow
              your income with <span className="font-semibold">RozgarWala</span>
              .{" "}
            </p>{" "}
            {/* CTA */}{" "}
            <button
              onClick={() => navigate("/signupworker")}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {" "}
              Join as Worker{" "}
            </button>{" "}
            {/* Secondary action */}{" "}
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700 transition"
            >
              {" "}
              Maybe later{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}

      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
            <div className="mt-5">
              <h1 className="text-4xl font-extrabold text-gray-900 ml-5">
                {t("hero_title")} 
                <span className="text-rose-600"> Rozgarwala</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl ml-5">
                {t("hero_subtitle")}
              </p>

              {/* SEARCH */}
              <div className="mt-10 bg-white rounded-2xl p-6 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full  rounded-xl py-3.5 px-5 shadow-md"
                  >
                    <option value="">Choose service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city or pincode"
                    className="w-full  rounded-xl py-3.5 px-4 shadow-md"
                  />
                </div>

                <button
                  onClick={handleHireWorker}
                  className="mt-5 w-full bg-red-500 hover:bg-red-600
                             text-white font-semibold py-3.5 rounded-xl shadow-lg"
                >
                  Hire Worker
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src={hero_bg}
                alt="Local workers"
                className="w-full max-w-md"
              />
            </div>
          </div>

          <div className="mt-15 bg-gray-100 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-6 py-5">
              <Feature Icon={FaCheckCircle} title="Verified Workers" />
              <Feature Icon={FaTag} title="Transparent Pricing" />
              <Feature Icon={FaHeadset} title="24/7 Support" />
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default Hero;
