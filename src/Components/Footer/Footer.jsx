// Footer.jsx
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer({ phone = "+91 8400059051" }) {
  const [logoError, setLogoError] = useState(false);

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "English");
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang === "hi" ? "हिंदी" : "English");
  };

  // 🔹 navigate + scroll top
  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 FAQ → bottom of contact page
  const goToFAQ = () => {
    navigate("/contact#faq");
    setTimeout(() => {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="relative mx-4 sm:mx-6 lg:mx-16 mt-8">
      {/* Decorative outer frame */}
      <div
        className="relative rounded-sm bg-white overflow-visible"
        style={{
          border: "1.2px solid rgba(224,74,64,0.95)",
          boxShadow:
            "0 0 0 4px rgba(224,74,64,0.03), 0 6px 18px rgba(15,23,42,0.04)",
        }}
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: -4,
            left: -4,
            width: 70,
            height: 6,
            background:
              "linear-gradient(90deg, rgba(224,74,64,1), rgba(255,120,110,0.6))",
            borderRadius: 4,
            boxShadow: "0 2px 6px rgba(224,74,64,0.06)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: -6,
            right: -6,
            width: 100,
            height: 8,
            background:
              "linear-gradient(90deg, rgba(224,74,64,0.85), rgba(255,120,110,0.35))",
            borderRadius: 6,
            transform: "rotate(-6deg)",
            boxShadow: "0 2px 12px rgba(224,74,64,0.04)",
          }}
        />

        {/* Social Icons block */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-30">
          <div
            className="flex gap-4 bg-white px-3 py-1 rounded-full items-center"
            style={{ boxShadow: "0 6px 20px rgba(15,23,42,0.07)" }}
          >
            <SocialCircle
              aria="whatsapp"
              onClick={() =>
                window.open("https://wa.me/918400059051", "_blank")
              }
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12.04 3C7.03 3 3 7.02 3 12.04c0 1.98.52 3.83 1.44 5.43L3 21l3.7-1.37c1.48.86 3.2 1.32 4.96 1.32 5.01 0 9.04-4.02 9.04-9.04S17.05 3 12.04 3zM16.7 14.4c-.25-.13-1.48-.74-1.71-.82-.23-.08-.39-.13-.55.13-.16.25-.62.82-.76.99-.14.16-.27.18-.52.06-.25-.13-1.05-.39-2-1.22-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.09-.16.05-.31-.02-.44-.07-.13-.55-1.32-.76-1.81-.2-.48-.41-.42-.55-.42-.14 0-.31-.01-.48-.01-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.17.86 2.3.98 2.46.11.16 1.7 2.6 4.12 3.64 2.42 1.04 2.42.69 2.85.65.44-.05 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.15-.46-.28z" />
              </svg>
            </SocialCircle>

            <SocialCircle
              aria="facebook"
              onClick={() => window.open("https://facebook.com", "_blank")}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M22 12.07C22 6.49 17.52 2 11.94 2S1.88 6.49 1.88 12.07C1.88 17.03 5.9 21.09 10.66 21.87v-6.16H8.03v-2.84h2.63V10.3c0-2.6 1.55-4.03 3.93-4.03 1.14 0 2.33.2 2.33.2v2.57h-1.31c-1.29 0-1.69.8-1.69 1.62v1.95h2.85l-.46 2.84h-2.39v6.16C18.1 21.09 22 17.03 22 12.07z" />
              </svg>
            </SocialCircle>

            <SocialCircle
              aria="linkedin"
              onClick={() => window.open("https://linkedin.com", "_blank")}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.67-1.2 2.32-2.45 4.78-2.45C21.98 7.75 24 9.9 24 13.8V24h-5v-9.45c0-2.25-.04-5.15-3.13-5.15-3.13 0-3.61 2.44-3.61 4.98V24h-5V8z" />
              </svg>
            </SocialCircle>
          </div>
        </div>
        {/* Inner content */}
        <div className="pt-8 pb-6">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              {/* LEFT */}
              <div className="flex flex-col gap-3 mt-10 md:col-span-1">
                {!logoError ? (
                  <img
                    src={logo}
                    alt="Rozgarwala logo"
                    className="w-36 h-auto object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <h2 className="text-xl font-bold text-[#ef4444]">
                    RozgarWala
                  </h2>
                )}

                <p className="text-sm text-gray-600 max-w-xs">{t("tagline")}</p>
              </div>

              {/* MIDDLE (WIDER) */}
              <div className="flex justify-center md:col-span-2">
                <div
                  className="w-full max-w-2xl bg-white"
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 8px 26px rgba(15,23,42,0.05)",
                    padding: "24px",
                    borderRadius: 6,
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    {/* FOR WORKERS */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {t("for_workers")}
                      </h4>
                      <ul className="mt-4 space-y-3">
                        <li
                          onClick={() => goTo("/signupworker")}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>{t("create_profile")}</span>
                          <span className="text-[#ef4444]">›</span>
                        </li>

                        <li
                          className="text-sm text-gray-400 cursor-not-allowed
                               flex justify-between items-center"
                        >
                          <span>{t("find_work")}</span>
                          <span>›</span>
                        </li>

                        <li
                          onClick={() => goTo("/contact")}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>{t("Help")}</span>
                          <span className="text-[#ef4444]">›</span>
                        </li>
                      </ul>
                    </div>

                    {/* FOR CUSTOMERS */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {t("for_customers")}
                      </h4>
                      <ul className="mt-4 space-y-3">
                        <li
                          onClick={() => goTo("/workers")}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>{t("hire_talent")}</span>
                          <span className="text-[#ef4444]">›</span>
                        </li>

                        <li
                          onClick={() => goTo("/contact")}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>
                            {t("Customer Support") || "Customer Support"}
                          </span>
                          <span className="text-[#ef4444]">›</span>
                        </li>
                      </ul>
                    </div>

                    {/* ABOUT */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {t("about")}
                      </h4>
                      <ul className="mt-4 space-y-3">
                        <li
                          onClick={() => goTo("/contact")}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>{t("contact_us")}</span>
                          <span className="text-[#ef4444]">›</span>
                        </li>

                        <li
                          onClick={goToFAQ}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>{t("faqs")}</span>
                          <span className="text-[#ef4444]">›</span>
                        </li>

                        <li
                          onClick={() => goTo("/privacy")}
                          className="text-sm text-gray-600 hover:text-[#ef4444]
                             cursor-pointer flex justify-between items-center"
                        >
                          <span>{t("privacy") || "Privacy Policy"}</span>
                          <span className="text-[#ef4444]">›</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-5 md:col-span-1 w-full mt-5">
                {/* CONTACT & SUPPORT */}
                <div className="w-full max-w-xs space-y-3">
                  {/* Phone */}
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-sm text-gray-700
                 hover:text-[#ef4444] transition"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.6 10.8C8 14 10.8 16.8 14 18.2l1.8-1.8c.2-.2.5-.3.8-.2 1 .3 2.3.5 3.6.5.6 0 1 .4 1 1V21c0 .6-.5 1-1.1 1C9.6 22 2 14.4 2 4.1 2 3.5 2.4 3 3 3h2.6c.5 0 .9.3 1 .8.2 1.3.5 2.6.9 3.7.1.4 0 .8-.2 1L6.6 10.8z" />
                    </svg>
                    <span className="font-medium">{phone}</span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:shivam2593479@gmail.com"
                    className="flex items-center gap-3 text-sm text-gray-700
                 hover:text-[#ef4444] transition"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span className="font-medium">shivam2593479@gmail.com</span>
                  </a>

                  {/* Support Hours */}
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 8v5l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Support: Mon – Sat, 10 AM – 8 PM</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full max-w-xs h-px bg-gray-200" />

                {/* LOCATION / AFFILIATION */}
                <div className="text-right text-xs text-gray-400 leading-relaxed max-w-xs">
                  {t("university")} <br />
                  {t("department")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
            <span className="text-sm text-gray-600">{t("copyright")}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-1 rounded-md border ${
                  language === "English"
                    ? "bg-[#ef4444] text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("hi")}
                className={`px-2 py-1 rounded-md border ${
                  language === "हिंदी"
                    ? "bg-[#ef4444] text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper component ---------- */
function SocialCircle({ aria, onClick, children }) {
  return (
    <button
      aria-label={aria}
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-[#ef4444] hover:bg-[#e04646]
                 flex items-center justify-center text-white shadow-lg"
    >
      {children}
    </button>
  );
}
