import { ShieldCheck, Wallet, MessageSquare, ThumbsUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TrustedHireSection() {
 const { t, i18n } = useTranslation();


  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-rose-500" />,
      title: t("feature_verified_title"),
      desc: t("feature_verified_desc"),
    },
    {
      icon: <Wallet className="w-12 h-12 text-rose-500" />,
      title: t("feature_pricing_title"),
      desc: t("feature_pricing_desc"),
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-rose-500" />,
      title: t("feature_chat_title"),
      desc: t("feature_chat_desc"),
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-rose-500" />,
      title: t("feature_reviews_title"),
      desc: t("feature_reviews_desc"),
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-rose-50 py-20 px-6 sm:px-10 lg:px-16 overflow-hidden rounded-3xl shadow-lg">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-4 tracking-tight">
          
          {i18n.language === "hi" && (
            <div>
              <span className="text-rose-600">RozgarWala</span>{" "}
              {t("trusted_hire_title")}
            </div>
          )}
           {i18n.language === "en" && (
            <div>
               {t("trusted_hire_title")}{" "}
              <span className="text-rose-600">RozgarWala</span>
             
            </div>
          )}
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
          {t("trusted_hire_subtitle")}
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-transparent hover:border-rose-100 text-center"
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            {t("cta_explore_services")}
          </button>
          <button className="border-2 border-red-500 text-rose-500 hover:bg-red-500 hover:text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            {t("cta_join_us")}
          </button>
        </div>
      </div>
    </section>
  );
}
