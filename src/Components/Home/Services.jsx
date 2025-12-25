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
  FaBook,
} from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ title, Icon, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center text-center min-h-[190px]">
      <div className="flex items-center justify-center w-20 h-20 rounded-md bg-gray-100 mb-4">
        <Icon className="text-red-600 w-10 h-10" />
      </div>

      <h3 className="mt-1 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <button
        onClick={onClick}
        className="mt-6 px-6 py-2 rounded-lg border border-gray-200
                   text-gray-800 bg-white hover:bg-red-600
                   hover:text-white transition text-sm"
      >
        {t("view_workers")}
      </button>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    { id: 1, title: "Plumber", Icon: FaWrench },
    { id: 2, title: "Electrician", Icon: FaBolt },
    { id: 3, title: "Mason", Icon: GiBrickWall },
    { id: 4, title: "Carpenter", Icon: FaRulerVertical },
    { id: 5, title: "Painter", Icon: FaPaintRoller },
    { id: 6, title: "Cleaner", Icon: FaBroom },
    { id: 7, title: "Tutor", Icon: FaBook },
    { id: 8, title: "Other", Icon: FaPlus },
  ];

  return (
    <section className="bg-white">
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
            <ServiceCard
              key={s.id}
              title={s.title}
              Icon={s.Icon}
              onClick={() => {
                if (s.title === "Other") {
                  navigate("/workers"); // show all workers
                } else {
                  navigate(`/workers?skill=${encodeURIComponent(s.title)}`);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
