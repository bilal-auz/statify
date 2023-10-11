import React, { useState } from "react";
import { useEffect } from "react";
import TopLists from "./TopLists";
import { fetchRecentlyPlayedTracks } from "../../../../services/DataFetchService";

function ListeningSummary() {
  const [songListenedStats, setSongListenedStats] = useState({});

  useEffect(() => {
    getNumberOfSongPlayed();
  }, []);

  const getNumberOfSongPlayed = async () => {
    const data = await fetchRecentlyPlayedTracks();

    setSongListenedStats({
      numberOfSongListened: data.items.length,
      timeListened: data.timeListened,
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-row mt-8 ml-5 w-full">
        <h2 className="font-[spotify-bold]">Listening Summary</h2>
      </div>
      <div className="divider before:bg-s_white after:bg-s_white"></div>
      <div className="flex flex-row justify-around mb-2">
        <div className="flex justify-center bg-[#19191b] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center justify-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img
                  className="rounded-[3px] bg-s_green"
                  src={"assets/songsCounter.svg"}
                />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Song Listened in &#123;last-Duration&#125;
              </p>
              <div className="w-full">
                <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                  #{songListenedStats.numberOfSongListened}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-[#19191b] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center justify-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img
                  className="rounded-[3px] bg-s_green w-12 p-2"
                  src={"assets/timeListened.svg"}
                />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Time Listened in &#123;last-Duration&#125;
              </p>
              <div className="w-full">
                <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                  {songListenedStats.timeListened} minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopLists />
    </React.Fragment>
  );
}

export default ListeningSummary;
