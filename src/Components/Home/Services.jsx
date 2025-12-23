// Services.jsx
import React from "react";
import {
  FaWrench,
  FaBolt,
  FaRulerVertical,
  FaPaintRoller,
  FaBroom,
  FaTint,
  FaPlus,
} from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";

// ✅ i18next hook
import { useTranslation } from "react-i18next";

const ServiceCard = ({ title, Icon }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center text-center min-h-[190px]">
      <div className="flex items-center justify-center w-20 h-20 rounded-md bg-gray-100 border border-transparent mb-4">
        <Icon className="text-red-600 w-10 h-10" aria-hidden="true" />
      </div>

      <h3 className="mt-1 text-lg font-semibold text-gray-900 leading-snug">
        {title}
      </h3>

      <button
        type="button"
        aria-label={`View ${title} workers`}
        className="mt-6 px-6 py-2 rounded-lg border border-gray-200 text-gray-800 bg-white hover:shadow-sm hover:bg-red-600 hover:text-white transition text-sm"
      >
        {t("view_workers")}
      </button>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();

  // ⭐ All service titles converted to bilingual
  const services = [
    { id: 1, title: t("service_plumber"), Icon: FaWrench },
    { id: 2, title: t("service_electrician"), Icon: FaBolt },
    { id: 3, title: t("service_mason"), Icon: GiBrickWall },
    { id: 4, title: t("service_carpenter"), Icon: FaRulerVertical },
    { id: 5, title: t("service_painter"), Icon: FaPaintRoller },
    { id: 6, title: t("service_cleaner"), Icon: FaBroom },
    { id: 7, title: t("service_water_tank"), Icon: FaTint },
    { id: 8, title: t("service_more"), Icon: FaPlus },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            {t("services_heading")}
          </h2>

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            {t("services_subheading")}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((s) => (
            <ServiceCard key={s.id} title={s.title} Icon={s.Icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
