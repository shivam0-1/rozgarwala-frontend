import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllWorkers } from "../../api/worker.api";
import profileImg from "../../assets/Male_review.png";

const AllWorker = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const skill = searchParams.get("skill");
  const location = searchParams.get("location");

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getAllWorkers();
        setWorkers(data);
      } catch (err) {
        console.error("Error fetching workers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const filteredWorkers = workers.filter((worker) => {
    // Skill match
    const skillMatch = skill
      ? worker.skill?.some(
          (s) => s.toLowerCase() === skill.toLowerCase()
        )
      : true;

    // City OR Pincode match
    let locationMatch = true;
    if (location) {
      const isPincode = /^\d+$/.test(location);

      if (isPincode) {
        // exact pincode match
        locationMatch =
          String(worker.location?.pincode) === String(location);
      } else {
        // city match (case-insensitive)
        locationMatch =
          worker.location?.city
            ?.toLowerCase()
            .includes(location.toLowerCase());
      }
    }

    return skillMatch && locationMatch;
  });

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500">
        Loading workers...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-900">
        {skill && location
          ? `${skill} in ${location}`
          : "Available Workers"}
      </h1>

      {filteredWorkers.length === 0 ? (
        <p className="text-center text-gray-500">
          No workers found for selected service and location.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-30">
          {filteredWorkers.map((worker) => (
            <div
              key={worker._id}
              className="relative bg-white rounded-2xl border shadow-md
                         hover:shadow-xl transition hover:-translate-y-2"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full bg-red-500 p-[3px]">
                  <img
                    src={profileImg}
                    alt="Worker"
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              </div>

              <div className="pt-16 px-5 pb-6 text-center space-y-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {worker.firstName} {worker.lastName}
                </h2>

                <span className="inline-block bg-red-100 text-red-600
                                 text-xs font-semibold px-3 py-1 rounded-full">
                  {worker.skill?.[0]}
                </span>

                <p className="text-sm text-gray-600">
                  ₹{worker.rate} / day
                </p>

                <p className="text-sm text-gray-500">
                  {worker.location?.city} ({worker.location?.pincode})
                </p>

                <button
                  onClick={() => navigate(`/workers/${worker._id}`)}
                  className="mt-4 w-full py-2 rounded-xl bg-gray-900
                             text-white font-semibold hover:bg-red-600 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWorker;
