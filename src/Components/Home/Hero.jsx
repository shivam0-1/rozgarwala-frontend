// Hero.jsx
import React from "react";
import hero_bg from "../../assets/hero-bg.png";
import { FaSearch, FaCheckCircle, FaTag, FaHeadset } from "react-icons/fa";

// ✅ Import i18n hook
import { useTranslation } from "react-i18next";

const Feature = ({ Icon, title }) => (
  <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition w-full sm:w-auto">
    <Icon className="text-gray-500 w-5 h-5" aria-hidden="true" />
    <span className="text-gray-700 text-sm sm:text-base font-medium">
      {title}
    </span>
  </div>
);

const Hero = () => {
  // ✅ i18n hook
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {t("hero_title")}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              {t("hero_subtitle")}
            </p>

            {/* Search Input */}
            <div className="mt-8">
              <div className="relative w-full max-w-md mx-auto md:mx-0">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder={t("hero_search_placeholder")}
                  aria-label={t("hero_search_placeholder")}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-700 placeholder-gray-400 
                             shadow-sm focus:ring-2 focus:ring-red-200 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-18 justify-center md:justify-start">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 y-3.5 rounded-xl shadow-md hover:shadow-lg transition">
                {t("hero_hire_worker")}
              </button>
              <button className="border border-red-500 bg-white text-rose-500 font-medium px-10 py-3.5 rounded-xl shadow-sm hover:shadow-md transition">
                {t("hero_choose_service")}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={hero_bg}
              alt="Local workers illustration"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto drop-shadow-md"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-18 bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Feature Icon={FaCheckCircle} title={t("hero_verified_workers")} />
            <Feature Icon={FaTag} title={t("hero_transparent_pricing")} />
            <Feature Icon={FaHeadset} title={t("hero_support")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
