import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { lineSpinner } from "ldrs";
import { uid } from "uid";

lineSpinner.register();

const Explore = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState();
  const [loading, setLoading] = useState(false);
  // console.log('params: ', params.explore);
  // console.log(totalPageNo);

  const fetchData = async () => {
    try {
      const response = await axios.get(`discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });

      setData((prev) => {
        return [...prev, ...response.data.results];
      });

      setTotalPageNo(response.data.total_pages);
      // console.log("discover :", response.data.results);
    } catch (err) {
      console.log("error:", err);
    }

    // Delay to allow spinner to render
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLoading(true);
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {params.explore} Show
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={uid()}
                media_type={params.explore}
              />
            );
          })}
        </div>

        {/* Loading Spinner :- */}
        {loading && (
          <div className="flex justify-center my-8">
            <l-line-spinner
              size="40"
              stroke="3"
              speed="1"
              color="gray"
            ></l-line-spinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
