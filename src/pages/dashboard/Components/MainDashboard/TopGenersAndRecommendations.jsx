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
      <h3 className="text-start ml-5 font-[spotify-bold]">Top Genres</h3>
      <div className="bg-[#19191b] px-7 py-1 pb-6 relative rounded-lg">
        <div className="mt-7">
          <ul className="">
            {topGenres &&
              topGenres.slice(0, 13).map((genre, index) => (
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
    </React.Fragment>
  );
}

export default TopGenersAndRecommendations;
