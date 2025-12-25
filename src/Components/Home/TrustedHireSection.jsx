import {
  ShieldCheck,
  Wallet,
  MessageSquare,
  ThumbsUp,
  Users,
  Star,
  Briefcase,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TrustedHireSection() {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: ShieldCheck,
      title: t("feature_verified_title"),
      desc: t("feature_verified_desc"),
    },
    {
      icon: Wallet,
      title: t("feature_pricing_title"),
      desc: t("feature_pricing_desc"),
    },
    {
      icon: MessageSquare,
      title: t("feature_chat_title"),
      desc: t("feature_chat_desc"),
    },
    {
      icon: ThumbsUp,
      title: t("feature_reviews_title"),
      desc: t("feature_reviews_desc"),
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "1000+",
      label: "Customers trust RozgarWala",
    },
    {
      icon: Briefcase,
      value: "50+",
      label: "Verified skilled workers",
    },
    {
      icon: Star,
      value: "4.1 ★",
      label: "Average service rating",
    },
  ];

  return (
    <section className="relative py-5 px-6 sm:px-10 lg:px-16 bg-[#fafafa] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <ShieldCheck className="w-4 h-4" />
            Trusted & Secure Platform
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            {i18n.language === "hi" ? (
              <>
                भरोसेमंद सेवाएं, भरोसेमंद लोग —{" "}
                <span className="text-rose-600">Rozgarwala</span>
              </>
            ) : (
              <>
                Hire with confidence on{" "}
                <span className="text-rose-600">Rozgarwala</span>
              </>
            )}
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            From verified professionals to transparent pricing —  
            everything is designed to give you peace of mind.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 bg-white/70 backdrop-blur rounded-3xl p-6 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">
                  {item.value}
                </p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <item.icon className="w-7 h-7 text-rose-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="mt-24 flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-full font-semibold shadow-lg transition">
            {t("cta_explore_services")}
          </button>

          <button className="bg-white border border-red-200 text-rose-600 hover:bg-red-50 px-12 py-4 rounded-full font-semibold shadow transition">
            {t("cta_join_us")}
          </button>
        </div> */}
      </div>
    </section>
  );
}
