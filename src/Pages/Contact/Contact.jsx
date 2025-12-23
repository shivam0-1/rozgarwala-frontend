import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  Linkedin,
  Instagram,
  Twitter,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "../../api/axiosInstance";

export default function ContactUs() {
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ---------------- Validation ---------------- */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await axios.post("/contact", form);
      setForm({ name: "", email: "", message: "" });
      setShowSuccess(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16 relative">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          {t("contact_title")}
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          {t("contact_subtitle")}
        </p>
      </div>

      {/* INFO CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <InfoCard icon={Phone} title={t("contact_phone")} value="+91 8400059051" />
        <InfoCard icon={Mail} title={t("contact_email")} value="shivam2593479@gmail.com" />
        <InfoCard
          icon={MapPin}
          title="Location"
          value="BHU – Computer Science Department, Varanasi"
        />
      </div>

      {/* FORM + MAP */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 mb-24">
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">
            {t("contact_form_title")}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label={t("contact_full_name")}
              value={form.name}
              error={errors.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <InputField
              label={t("contact_email_label")}
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("contact_message_label")}
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className={`w-full rounded-lg border px-4 py-3 focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-600"
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message}</p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Sending..." : t("contact_send_button")}
            </button>
          </form>
        </div>

        {/* MAP */}
        <div className="rounded-2xl overflow-hidden shadow-xl border">
          <iframe
            title="BHU Computer Science Department"
            src="https://www.google.com/maps?q=BHU+Computer+Science+Department&output=embed"
            className="w-full h-full min-h-[420px]"
            loading="lazy"
          />
        </div>
      </div>

      {/* SOCIAL MEDIA */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h3 className="text-2xl font-semibold mb-6">Connect with us</h3>
        <div className="flex justify-center gap-6">
          <Social href="https://www.linkedin.com" icon={Linkedin} />
          <Social href="https://www.instagram.com" icon={Instagram} />
          <Social href="https://twitter.com" icon={Twitter} />
          <Social href="https://wa.me/918400059051" icon={Phone} />
        </div>
      </div>

      {/* FAQ (KEPT) */}
      <div className="max-w-4xl mx-auto mb-20">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h3>
        <FAQ
          q="How soon will I get a response?"
          a="Our support team usually responds within 24 hours."
        />
        <FAQ
          q="Is this service available in my city?"
          a="We are expanding rapidly across India."
        />
        <FAQ
          q="Can I contact support via WhatsApp?"
          a="Yes, use the WhatsApp button below for instant support."
        />
      </div>

      {/* WHATSAPP SUPPORT (KEPT) */}
      <a
        href="https://wa.me/918400059051"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition z-50"
      >
        WhatsApp Support
      </a>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center">
            <CheckCircle className="text-green-500 mx-auto" size={48} />
            <h3 className="text-xl font-semibold mt-4">
              Message Sent Successfully
            </h3>
            <p className="text-gray-600 mt-2">
              Our team will contact you soon.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rozgarwala. {t("contact_footer")}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-2">
        <Icon className="text-red-600" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}

function InputField({ label, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-3 focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-red-600"
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <p className="font-medium text-gray-800">{q}</p>
      <p className="text-gray-600 mt-1">{a}</p>
    </div>
  );
}

function Social({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition"
    >
      <Icon size={22} />
    </a>
  );
}
