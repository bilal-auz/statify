import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchTopItems } from "../../../../services/DataFetchService";

function TopSongList() {
  const [overP2, setOverP2] = useState(false);
  const [overP3, setOverP3] = useState(false);
  const [topSongs, setTopSong] = useState(undefined);
  const [TopArtists, setTopArtists] = useState({});

  useEffect(() => {
    getTopSongs();
  }, []);

  const getTopSongs = async () => {
    console.log("topSongs");
    const topSongsData = await fetchTopItems("tracks", "long_term", 5);

    console.log(topSongsData.items);
    setTopSong(topSongsData.items);
  };
  return (
    <React.Fragment>
      <h3 className="text-start ml-5 font-[spotify-bold]">Top Songs</h3>
      <div className="bg-[#19191b] p-7 relative rounded-lg">
        {topSongs && (
          <div className="top flex justify-center items-center w-full relative max-w-lg mx-auto h-64 ">
            <img
              src={topSongs[0].album.images[0].url}
              alt="Image 1"
              className={
                "p1 rounded-lg w-60 absolute z-20 duration-300 hover:scale-105 " +
                (overP2 ? "translate-x-5 scale-90 rotate-6" : "") +
                (overP3 ? "-translate-x-5 scale-90 -rotate-6" : "")
              }
            />
            <img
              src={topSongs[1].album.images[0].url}
              alt="Image 2"
              class="p2 rounded-lg w-48 absolute left-0 z-10 duration-300 hover:scale-105 hover:-translate-x-2"
              onMouseOver={() => setOverP2(true)}
              onMouseLeave={() => setOverP2(false)}
            />
            <img
              src={topSongs[2].album.images[0].url}
              alt="Image 3"
              class="p3 rounded-lg w-44 absolute right-0 z-0 duration-300 hover:scale-105 hover:translate-x-2"
              onMouseOver={() => setOverP3(true)}
              onMouseLeave={() => setOverP3(false)}
            />
          </div>
        )}

        <div className="mt-7">
          <ul className="">
            {topSongs &&
              topSongs.map((track, index) => (
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
    </React.Fragment>
  );
}

export default TopSongList;
