"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import Male_img from "../../assets/Male_review.png";
import Female_img from "../../assets/Female-review.png";

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("testimonial_1_name"),
      role: t("testimonial_1_role"),
      img: Female_img,
      review: t("testimonial_1_review"),
    },
    {
      name: t("testimonial_2_name"),
      role: t("testimonial_2_role"),
      img: Male_img,
      review: t("testimonial_2_review"),
    },
    {
      name: t("testimonial_3_name"),
      role: t("testimonial_3_role"),
      img: Female_img,
      review: t("testimonial_3_review"),
    },
    {
      name: t("testimonial_4_name"),
      role: t("testimonial_4_role"),
      img: Male_img,
      review: t("testimonial_4_review"),
    },
    {
      name: t("testimonial_5_name"),
      role: t("testimonial_5_role"),
      img: Female_img,
      review: t("testimonial_5_review"),
    },
    {
      name: t("testimonial_6_name"),
      role: t("testimonial_6_role"),
      img: Male_img,
      review: t("testimonial_6_review"),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-rose-50 py-10  relative">
      <div className="max-w-6xl mx-auto text-center">

        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-3 tracking-tight">
          {t("testimonials_heading")}{" "}
          <span className="text-red-600">...</span>
        </h2>

        <p className="text-gray-600 text-lg mb-12">
          {t("testimonials_subheading")}
        </p>

        {/* Swiper */}
        <div className="relative">
          <button className="prev-btn absolute -left-15 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-lg w-12 h-12 rounded-full flex items-center justify-center text-[#7a1c1c] hover:bg-[#7a1c1c] hover:text-white transition-all duration-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="next-btn absolute -right-15 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-lg w-12 h-12 rounded-full flex items-center justify-center text-[#7a1c1c] hover:bg-[#7a1c1c] hover:text-white transition-all duration-300">
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            loop
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {testimonials.map((tItem, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col items-center text-center">
                  <img
                    src={tItem.img}
                    alt={tItem.name}
                    className="w-24 h-24 rounded-full border-4 border-rose-100 shadow mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#7a1c1c]">
                    {tItem.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {tItem.role}
                  </p>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#e63946] text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-sm leading-relaxed line-clamp-3">
                    “{tItem.review}”
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
