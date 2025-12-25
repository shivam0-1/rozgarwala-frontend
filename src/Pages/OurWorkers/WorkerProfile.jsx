import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import profileImg from "../../assets/Male_review.png";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Phone,
  Star,
  MessageCircle,
} from "lucide-react";

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rating state
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axiosInstance.get(`/workers/${id}`);
        setWorker(res.data.worker || res.data);
      } catch (err) {
        console.error("Fetch worker failed:", err);
        setWorker(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="py-32 text-center text-red-500 text-lg">
        Worker not found
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello ${worker.firstName}, I found your profile on RozgarWala and would like to hire you.`
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#E53935] to-orange-500 p-10 text-center text-white shadow-2xl">
        <div className="mx-auto w-32 h-32 rounded-full bg-white p-[4px] shadow-xl">
          <img
            src={profileImg}
            alt="Worker"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold">
          {worker.firstName} {worker.lastName}
        </h1>

        <span className="mt-2 inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
          {worker.skill?.[0]}
        </span>
      </div>

      {/* INFO CARDS */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        <InfoCard
          icon={<Briefcase size={22} />}
          title="Experience"
          value={`${worker.experienceYear}+ years`}
        />
        <InfoCard
          icon={<IndianRupee size={22} />}
          title="Rate"
          value={`₹${worker.rate} / day`}
        />
        <InfoCard
          icon={<MapPin size={22} />}
          title="Location"
          value={`${worker.location?.city}, ${worker.location?.pincode}`}
        />
      </div>

      {/* SKILLS */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-3">
          {worker.skill?.map((s, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* CONTACT & ACTIONS */}
      <Section title="Contact & Hire">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hire Now */}
          <button
            className="py-4 rounded-2xl bg-gray-900 text-white font-bold
                       hover:bg-black transition"
            onClick={() => alert("Hire flow coming soon")}
          >
            Hire Now
          </button>

          {/* Call */}
          <a
            href={`tel:${worker.phone}`}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl
                       bg-green-600 text-white font-bold hover:bg-green-700 transition"
          >
            <Phone size={18} />
            Call Now
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/91${worker.phone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl
                       bg-[#25D366] text-white font-bold hover:brightness-110 transition"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </Section>

      {/* RATING & REVIEW */}
      <Section title="Rate & Review">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your experience..."
          className="w-full min-h-[120px] rounded-xl border p-4 outline-none
                     focus:ring-2 focus:ring-[#E53935]"
        />

        <button
          className="mt-4 px-6 py-3 rounded-xl bg-gray-900 text-white font-bold
                     hover:bg-black transition"
          onClick={() => alert("Review saved (backend integration pending)")}
        >
          Submit Review
        </button>
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mt-16 rounded-3xl bg-white border shadow-xl p-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="rounded-2xl bg-white shadow-lg border p-6 text-center">
    <div className="flex justify-center text-[#E53935] mb-3">{icon}</div>
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

export default WorkerProfile;
