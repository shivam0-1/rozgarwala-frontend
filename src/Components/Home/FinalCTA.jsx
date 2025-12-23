import React from "react";
import { useTranslation } from "react-i18next";

const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.005] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div className="p-10 sm:p-12 lg:p-16">
              <div className="mb-2">
                <span className="inline-block bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-red-100">
                  {t("finalcta_badge")}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t("finalcta_title_line1")}
                <br />
                <span className="text-red-600">
                  {t("finalcta_title_line2")}
                </span>
              </h2>
              
              <div className="space-y-3 mb-8">
                <p className="text-xl text-gray-700 font-medium">
                  {t("finalcta_sub_1")}
                </p>
                <p className="text-xl text-gray-700 font-medium">
                  {t("finalcta_sub_2")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-red-500 text-white hover:bg-red-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {t("finalcta_hire_today")}
                </button>

                <button className="bg-white text-red-600 hover:bg-red-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-red-600">
                  {t("finalcta_start_earning")}
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">
                  {t("finalcta_availability")}
                </span>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="h-80 lg:h-96 bg-gradient-to-br from-red-50 to-red-100 relative flex items-center justify-center p-8 border-l border-gray-100">
              <div className="absolute top-0 left-0 w-32 h-32 bg-red-200 rounded-full -translate-x-16 -translate-y-16 opacity-40"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-300 rounded-full translate-x-12 translate-y-12 opacity-30"></div>
              
              <div className="relative bg-white rounded-2xl p-8 border border-red-100 shadow-lg max-w-sm w-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  <h3 className="text-gray-900 text-xl font-bold mb-2">
                    {t("finalcta_premium_title")}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {t("finalcta_premium_desc")}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-red-600 font-bold text-2xl">500+</div>
                      <div className="text-gray-600 text-xs">
                        {t("finalcta_stat_professionals")}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-red-600 font-bold text-xl">10 AM–8 PM</div>
                      <div className="text-gray-600 text-xs">
                        {t("finalcta_stat_service")}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
