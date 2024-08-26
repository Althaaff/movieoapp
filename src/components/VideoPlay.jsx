import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetail from "../hooks/useFetchDetail";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetail(
    `/${media_type}/${data.id}/videos`
  );
  // console.log("videoData :", videoData);
  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[50vh] max-w-screen-lg aspect-video relative rounded">
        <button
          className="absolute top-1 -right-2 p-2 text-white font-semibold lg:-right-9 lg:-top-9 lg:bg-white lg:text-black lg:rounded-full text-2xl z-50"
          onClick={close}
        >
          <IoClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="absolute top-0 w-full h-full"
        />
      </div>
    </section>
  );
};

export default VideoPlay;
