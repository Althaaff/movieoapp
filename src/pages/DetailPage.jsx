// Movie detail page :

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetail from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import moment from "moment";
import Devider from "../components/Devider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";
import VideoPlay from "../components/VideoPlay";

const DetailPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.moviosData.imageUrl);
  const { data } = useFetchDetail(`/${params.explore}/${params?.id}`);
  const { data: castDetails } = useFetchDetail(
    `/${params.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params.explore}/${params?.id}/recommendations`
  );

  // for video :
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  const writer = castDetails?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el.name)
    ?.join(", ");

  // console.log("writer: ", writer);


  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true);
  }

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          {data?.backdrop_path ? (
            <img
              src={imageUrl + data?.backdrop_path} 
              alt=""
              className="h-full 
                w-full object-cover"
            />
          ) : (
            <img className="h-full 
            w-full object-cover"
              src="data:image/jpeg;base64,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"
              alt=""
            />
          )}
        </div>

        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          {data?.poster_path ? (
            <img
              className="h-60 w-60 object-cover rounded"
              src={imageUrl + data?.poster_path}
              alt=""
            />
          ) : (
            <div className="">
              <img
                className="h-60 w-60 object-cover rounded"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
          )}
          <button onClick={() => handlePlayVideo(data)} className="mt-3 w-full py-2 px-4 text-center font-bold bg-white text-black text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition rounded">
            Play Now
          </button>
        </div>

        <div>
          <h2 className="text-lg lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          {/* Devider component : */}
          <Devider />
          <div className="flex items-center gap-3">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {isNaN ? null : duration?.[0]}h {duration[1]}m
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Overview</h3>
            <p>
              {data?.overview ||
                'Inception follows Dom Cobb, a skilled thief who specializes in extracting valuable secrets from within the subconscious during the dream state. Cobb is offered a chance to have his criminal history erased if he can successfully implant an idea into a target\'s mind, a process known as "inception." However, as Cobb and his team delve deeper into the layers of dreams, the boundaries between reality and dreams begin to blur, leading to a thrilling and mind-bending journey.'}
            </p>

            <Devider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status : {data?.status}</p>

              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue : {data?.revenue}</p>
            </div>

            <Devider />
          </div>

          <div>
            <p>
              <span className="text-white font-bold"> Director</span> :{" "}
              {castDetails?.crew[0]?.name}{" "}
            </p>

            <Devider />
            <p>
              <span>Writer : {writer}</span>
            </p>
          </div>

          <Devider />
          <h2 className="font-bold text-lg ">Cast :</h2>

          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castDetails?.cast
              ?.filter((el) => el?.profile_path)
              .map((startCast, index) => {
                return (
                  <div className="">
                    <div>
                      <img
                        className="w-24 h-24 object-cover rounded-full "
                        src={imageUrl + startCast?.profile_path}
                        alt=""
                      />
                    </div>
                    <p className="font-bold text-center text-sm">
                      {startCast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        {Array.isArray(similarData) && similarData.length > 0 && (
          <HorizontalScrollCard
            data={similarData}
            heading={`Similar ` + params?.explore}
            media_type={params?.explore}
          />
        )}

        {Array.isArray(recommendationData) && recommendationData.length > 0 && (
          <HorizontalScrollCard
            data={recommendationData}
            heading={`recommendation ` + params?.explore}
            media_type={params?.explore}
          />
        )}
      </div>
       
      { playVideo && (
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
      )}
    </div>
  );
};

export default DetailPage;
