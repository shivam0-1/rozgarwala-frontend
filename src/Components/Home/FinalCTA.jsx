import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const FinalCTA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative py-10 px-6 sm:px-10 lg:px-16 bg-[#fafafa] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-200/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-rose-200/30 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= LEFT ================= */}
            <div className="p-10 sm:p-14 lg:p-16">
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <ShieldCheck className="w-4 h-4" />
                {t("finalcta_badge")}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                {t("finalcta_title_line1")}
                <br />
                <span className="text-red-600">
                  {t("finalcta_title_line2")}
                </span>
              </h2>

              <p className="text-lg text-gray-700 mb-2">
                {t("finalcta_sub_1")}
              </p>
              <p className="text-lg text-gray-700 mb-10">
                {t("finalcta_sub_2")}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => navigate("/workers")}
                  className="group inline-flex items-center justify-center gap-3
                             bg-red-500 hover:bg-red-600 text-white
                             font-semibold px-8 py-4 rounded-xl
                             shadow-lg transition"
                >
                  {t("finalcta_hire_today")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>

                <button
                  onClick={() => navigate("/signupworker")}
                  className="inline-flex items-center justify-center
                             bg-white border-2 border-red-500 text-red-600
                             hover:bg-red-50 font-semibold
                             px-8 py-4 rounded-xl transition"
                >
                  {t("finalcta_start_earning")}
                </button>
              </div>

              {/* TRUST LINE */}
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-medium">
                  {t("finalcta_availability")}
                </span>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-10">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
                <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mx-auto mb-6 shadow-md">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-center text-xl font-bold text-gray-900 mb-2">
                  {t("finalcta_premium_title")}
                </h3>

                <p className="text-center text-gray-600 text-sm mb-6">
                  {t("finalcta_premium_desc")}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <p className="text-2xl font-extrabold text-red-600">
                      500+
                    </p>
                    <p className="text-xs text-gray-600">
                      {t("finalcta_stat_professionals")}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <p className="text-lg font-bold text-red-600">
                      10 AM – 8 PM
                    </p>
                    <p className="text-xs text-gray-600">
                      {t("finalcta_stat_service")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
