import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Card from "./Card";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();
  const handleNext = () => {
   if (containerRef.current) {
    containerRef.current.scrollBy({
      left: 229,
      behavior: 'smooth'
    })
   }
  }


  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -229,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="container min-w-[230px] mx-auto px-3 my-12 relative">
      <h1 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h1>

      <div className="relative">
        <div className="overflow-x-auto scroll-smooth transition-all scrollbar-none" ref={containerRef}>
          <div
            className="grid grid-flow-col auto-cols-[230px] gap-6"
          >
            {data.map((data, index) => (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            ))}
          </div>

         {/* left and right buttons :- */}
          <div className="absolute lg:top-1/2 left-2 transform -translate-y-1/2 z-10 -ml-5 lg:block hidden">
            <button
              onClick={handlePrev}
              className="bg-white p-2 text-black text-1xl rounded-full shadow-lg"
            >
              <FaAngleLeft />
            </button>
          </div>

          <div className="absolute lg:top-1/2 right-2 transform -translate-y-1/2 z-10 -mr-5 lg:block hidden">
            <button 
              onClick={handleNext}
              className="bg-white p-2 text-black text-1xl rounded-full shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;

