import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchTopItems } from "../../../../services/DataFetchService";

function TopArtistsList() {
  const [overP2, setOverP2] = useState(false);
  const [overP3, setOverP3] = useState(false);
  const [topArtists, setTopArtists] = useState(undefined);

  useEffect(() => {
    getTopArtists();
  }, []);

  const getTopArtists = async () => {
    const topArtistsData = await fetchTopItems("artists", "long_term", 5);

    console.log(topArtistsData.items);
    setTopArtists(topArtistsData.items);
  };

  return (
    <React.Fragment>
      <h3 className="text-start ml-5 font-[spotify-bold]">Top Artists</h3>
      <div className="bg-[#19191b] p-7 relative rounded-lg">
        {topArtists && (
          <div className="top flex justify-center items-center w-full relative max-w-lg mx-auto h-64 ">
            <img
              src={topArtists[0].images[0].url}
              alt="Image 1"
              className={
                "p1 rounded-full w-60 absolute z-20 duration-300 hover:scale-105 " +
                (overP2 ? "translate-x-5 scale-90 rotate-6" : "") +
                (overP3 ? "-translate-x-5 scale-90 -rotate-6" : "")
              }
            />
            <img
              src={topArtists[1].images[0].url}
              alt="Image 2"
              class="p2 rounded-full w-48 absolute left-0 z-10 duration-300 hover:scale-105 hover:-translate-x-2"
              onMouseOver={() => setOverP2(true)}
              onMouseLeave={() => setOverP2(false)}
            />
            <img
              src={topArtists[2].images[0].url}
              alt="Image 3"
              class="p3 rounded-full w-44 absolute right-0 z-0 duration-300 hover:scale-105 hover:translate-x-2"
              onMouseOver={() => setOverP3(true)}
              onMouseLeave={() => setOverP3(false)}
            />
          </div>
        )}

        <div className="mt-7">
          <ul className="">
            {topArtists &&
              topArtists.map((artist, index) => (
                <li className="flex flex-row text-start items-center mb-5">
                  <p className="w-5 text-base text-gray-500 font-bold">
                    {index + 1}
                  </p>
                  <div className="mr-5">
                    <img
                      className="w-12 rounded-full"
                      src={artist.images[2].url}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-lg font-[spotify-bold]">{artist.name}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TopArtistsList;