import React from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/Male_review.png";

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  return (
    <div className="min-w-[280px] max-w-[280px] bg-white rounded-2xl shadow-md
                    hover:shadow-xl transition hover:-translate-y-1 p-6 text-center">
      {/* Avatar */}
      <div className="mx-auto w-20 h-20 rounded-full bg-red-500 p-[3px] -mt-12">
        <img
          src={profileImg}
          alt="Worker"
          className="w-full h-full rounded-full object-cover bg-white"
        />
      </div>

      <h3 className="mt-4 font-bold text-gray-900">
        {worker.firstName} {worker.lastName}
      </h3>

      <span className="inline-block mt-2 bg-red-100 text-red-600
                       text-xs font-semibold px-3 py-1 rounded-full">
        {worker.skill?.[0]}
      </span>

      <p className="mt-2 text-sm text-gray-600">
        ₹{worker.rate} / day
      </p>

      <p className="text-xs text-gray-500">
        {worker.location?.city}
      </p>

      <button
        onClick={() => navigate(`/workers/${worker._id}`)}
        className="mt-4 w-full py-2 rounded-xl bg-gray-900
                   text-white font-semibold hover:bg-red-600 transition"
      >
        View Profile
      </button>
    </div>
  );
};

export default WorkerCard;
