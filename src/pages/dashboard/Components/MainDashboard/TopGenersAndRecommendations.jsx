import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  fetchRecommendations,
  fetchTopItems,
} from "../../../../services/DataFetchService";
import { getMostRepetitiveGenre } from "../../../../helper/helpers";

function TopGenersAndRecommendations() {
  const [overP2, setOverP2] = useState(false);
  const [overP3, setOverP3] = useState(false);
  const [topGenres, setTopGenres] = useState(undefined);
  const [recommendations, setRecommendations] = useState(undefined);

  useEffect(() => {
    getTopAlbums();
    getRecommendations();
  }, []);

  const getTopAlbums = async () => {
    const topArtistsData = await fetchTopItems("artists", "long_term", 50);
    const topGeneresSorted = getMostRepetitiveGenre(topArtistsData.items); //sorted topGeneres[0][0]: genre Name, topGeneres[0][1]: repetition number

    console.log(topGeneresSorted);
    setTopGenres(topGeneresSorted);
  };

  const getRecommendations = async () => {
    const topSongsData = await fetchTopItems("tracks", "long_term", 5);

    const topTracksIds = [topSongsData.items.map((track) => track.id)];
    const recommendationsData = await fetchRecommendations(topTracksIds);

    setRecommendations(recommendationsData);
  };

  return (
    <React.Fragment>
      <div className="mb-5">
        <h3 className="text-start ml-5 font-[spotify-bold]">Top Genres</h3>
        <div className="bg-[#19191b] px-7 py-1 relative rounded-lg">
          {/* {topAlbums && (
          <div className="top flex justify-center items-center w-full relative max-w-lg mx-auto h-64 ">
            <img
              src={topAlbums[0][1].albumInfo.images[0].url}
              alt="Image 1"
              className={
                "p1 rounded-lg w-60 absolute z-20 duration-300 hover:scale-105 " +
                (overP2 ? "translate-x-5 scale-90 rotate-6" : "") +
                (overP3 ? "-translate-x-5 scale-90 -rotate-6" : "")
              }
            />
            <img
              src={topAlbums[1][1].albumInfo.images[0].url}
              alt="Image 2"
              class="p2 rounded-lg w-48 absolute left-0 z-10 duration-300 hover:scale-105 hover:-translate-x-2"
              onMouseOver={() => setOverP2(true)}
              onMouseLeave={() => setOverP2(false)}
            />
            <img
              src={topAlbums[2][1].albumInfo.images[0].url}
              alt="Image 3"
              class="p3 rounded-lg w-44 absolute right-0 z-0 duration-300 hover:scale-105 hover:translate-x-2"
              onMouseOver={() => setOverP3(true)}
              onMouseLeave={() => setOverP3(false)}
            />
          </div>
        )} */}

          <div className="mt-7">
            <ul className="">
              {topGenres &&
                topGenres.slice(0, 5).map((genre, index) => (
                  <li className="flex flex-row text-start items-center mb-5">
                    <p className="w-5 text-base text-gray-500 font-bold">
                      {index + 1}
                    </p>

                    <div>
                      <p className="text-lg font-[spotify-bold] capitalize">
                        {genre[0]}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-start ml-5 font-[spotify-bold]">
          Top Recommendations
        </h3>
        <div className="bg-[#19191b] px-7 py-1 relative rounded-lg">
          {/* {topAlbums && (
          <div className="top flex justify-center items-center w-full relative max-w-lg mx-auto h-64 ">
            <img
              src={topAlbums[0][1].albumInfo.images[0].url}
              alt="Image 1"
              className={
                "p1 rounded-lg w-60 absolute z-20 duration-300 hover:scale-105 " +
                (overP2 ? "translate-x-5 scale-90 rotate-6" : "") +
                (overP3 ? "-translate-x-5 scale-90 -rotate-6" : "")
              }
            />
            <img
              src={topAlbums[1][1].albumInfo.images[0].url}
              alt="Image 2"
              class="p2 rounded-lg w-48 absolute left-0 z-10 duration-300 hover:scale-105 hover:-translate-x-2"
              onMouseOver={() => setOverP2(true)}
              onMouseLeave={() => setOverP2(false)}
            />
            <img
              src={topAlbums[2][1].albumInfo.images[0].url}
              alt="Image 3"
              class="p3 rounded-lg w-44 absolute right-0 z-0 duration-300 hover:scale-105 hover:translate-x-2"
              onMouseOver={() => setOverP3(true)}
              onMouseLeave={() => setOverP3(false)}
            />
          </div>
        )} */}

          <div className="mt-7">
            <ul className="">
              {recommendations &&
                recommendations.tracks.map((track, index) => (
                  <li className="flex flex-row text-start items-center mb-5">
                    <p className="w-5 text-base text-gray-500 font-bold">
                      {index + 1}
                    </p>
                    <div className="mr-5">
                      <img
                        className="w-12 rounded"
                        src={track.album.images[2].url}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-lg font-[spotify-mid]">{track.name}</p>
                      <p className="text-sm text-gray-500 font-[spotify-txtBook]">
                        {track.artists[0].name}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TopGenersAndRecommendations;
