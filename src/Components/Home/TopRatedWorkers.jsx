import React, { useEffect, useState } from "react";
import { getAllWorkers } from "../../api/worker.api";
import WorkerSlider from "../../Pages/OurWorkers/WorkerSlider.jsx";

const TopRatedWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllWorkers();
      setWorkers(data); // later sort by rating
    };
    fetch();
  }, []);

  return (
    <WorkerSlider
      title="Top Rated Workers"
      subtitle="Highly rated for quality & reliability"
      workers={workers}
      autoPlay
      interval={3500}
    />
  );
};

export default TopRatedWorkers;
