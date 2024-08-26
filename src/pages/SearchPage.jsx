import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { tailChase } from "ldrs";
tailChase.register();

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const query = location?.search?.slice(3);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });

      setData((prev) => {
        return [...prev, ...response.data.results];
      });

      // console.log('discover :', response.data.results);
    } catch (err) {
      console.log("error:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location.search]);
  //  console.log('location is --> ',location.search);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  return (
    <div className="pt-16">
      <div className="lg:hidden py-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query.split("%20")?.join(" ")}
          className="px-4 py-1 text-lg w-full text-neutral-900 bg-white rounded-full"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3 ml-4 lg:justify-start">
          Search Results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center relative">
          {loading ? (
           <div className="flex justify-center items-center lg:mt-40 ">
             <l-tail-chase size="40" speed="1.75" color="gray"></l-tail-chase>
           </div>
          ) : data.length > 0 ? (
            data.map((searchData) => (
              <Card
                data={searchData}
                key={searchData.id + "search"}
                media_type={searchData.media_type}
              />
            ))
          ) : (
            <div className="flex items-center justify-center mt-20 bg-red-500 text-white font-semibold rounded">
              No Movie Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
