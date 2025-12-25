import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WorkerCard from "./WorkerCard";

const WorkerSlider = ({
  title,
  subtitle,
  workers = [],
  autoPlay = true,
  interval = 3000,
}) => {
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);

  // duplicate list for infinite feel
  const sliderWorkers = [...workers, ...workers];

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const cardWidth = 300; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // autoplay logic
  useEffect(() => {
    if (!autoPlay || workers.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollRef.current;

      // if near end → reset to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
      } else {
        scroll("right");
      }
    }, interval);

    return () => clearInterval(autoPlayRef.current);
  }, [workers, autoPlay, interval]);

  return (
    <section className="py-24 relative">
      {/* ===== Heading ===== */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* ===== Slider Wrapper ===== */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 rounded-full bg-white shadow-lg
                     flex items-center justify-center hover:scale-110 transition"
        >
          <ChevronLeft />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 rounded-full bg-white shadow-lg
                     flex items-center justify-center hover:scale-110 transition"
        >
          <ChevronRight />
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll scroll-smooth
                     no-scrollbar px-10 pt-10"
        >
          {sliderWorkers.map((worker, index) => (
            <WorkerCard
              key={`${worker._id}-${index}`}
              worker={worker}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkerSlider;
