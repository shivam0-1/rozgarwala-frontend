import React, { useEffect, useState } from "react";
import { getAllWorkers } from "../../api/worker.api";
import WorkerSlider from "../../Pages/OurWorkers/WorkerSlider.jsx";

const MostHiredWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllWorkers();
      setWorkers(data); // later sort by hireCount
    };
    fetch();
  }, []);

  return (
    <WorkerSlider
      title="Most Hired Workers"
      subtitle="Trusted by hundreds of customers"
      workers={workers}
      autoPlay
      interval={3000}
    />
  );
};

export default MostHiredWorkers;
