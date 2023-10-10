import React, { useState } from "react";
import { useEffect } from "react";
import {
  fetchCurrentSong,
  fetchTopItems,
} from "../../services/DataFetchService";

function MainDashboard() {
  const [currentSong, setCurrentSong] = useState({});
  const [topTrack, setTopTrack] = useState({});
  const [topArtist, setTopArtist] = useState({});

  useEffect(() => {
    console.log("useEffect");
    getCurrentSong();
    getTopTrack();
    getTopArtist();
  }, []);

  const getCurrentSong = async () => {
    console.log("getCurrentSong");

    const currentSongData = {
      isPlaying: "",
      name: "",
      albumCover: "",
      linkToCurrentSong: "",
    };
    const data = await fetchCurrentSong();

    if (data == "") return setCurrentSong(null);

    currentSongData.name = data.item.name;
    currentSongData.isPlaying = data.is_playing;
    currentSongData.albumCover = data.item.album.images[0].url;
    currentSongData.linkToCurrentSong = data.item.external_urls.spotify;

    setCurrentSong(currentSongData);
  };

  const getTopTrack = async () => {
    const topTrackData = {
      name: "",
      albumCover: "",
      linkToSong: "",
    };

    const data = await fetchTopItems("tracks");

    topTrackData.name = data.items[0].name;
    topTrackData.albumCover = data.items[0].album.images[0].url;
    topTrackData.linkToSong = data.items[0].external_urls.spotify;

    setTopTrack(topTrackData);
  };

  const getTopArtist = async () => {
    const topArtistkData = {
      name: "",
      artistCover: "",
      linkToArtist: "",
    };

    const data = await fetchTopItems("artists");

    topArtistkData.name = data.items[0].name;
    topArtistkData.artistCover = data.items[0].images[0].url;
    topArtistkData.linkToArtist = data.items[0].external_urls.spotify;

    setTopArtist(topArtistkData);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between">
        <div className="flex justify-center bg-[#19191b] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center justify-center">
            {(currentSong == null && (
              <div className="text-base"> Quiet for a while... 💤💤 </div>
            )) || (
              <React.Fragment>
                <div class="flex justify-center items-center">
                  <div class="w-12">
                    <img
                      className="rounded-[3px]"
                      src={currentSong.albumCover}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start ml-4 w-4/5">
                  <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                    {(currentSong.isPlaying && "Currently Playing") ||
                      "Currently Paused"}
                  </p>
                  <div className="w-full">
                    <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                      {currentSong.name}
                    </p>
                  </div>
                  <a href={currentSong.linkToCurrentSong}>
                    <img
                      className="w-5 absolute right-2 bottom-2"
                      src="assets/icons/spotify-logo.svg"
                      alt=""
                    />
                  </a>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="flex justify-center bg-[#1c1c1c] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img className="rounded-[3px]" src={topTrack.albumCover} />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Top track in last Duration
              </p>
              <div className="w-full">
                <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                  {topTrack.name}
                </p>
              </div>
              <a href={topTrack.linkToSong} className="hidden">
                <img
                  className="w-5 absolute right-2 bottom-2"
                  src="assets/icons/spotify-logo.svg"
                  alt="currentTopSong"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-[#1c1c1c] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img className="rounded-[3px]" src={topArtist.artistCover} />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Top Artist
              </p>
              <div className="w-full">
                <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                  {topArtist.name}
                </p>
              </div>
              <a href={topArtist.linkToArtist} className="hidden">
                <img
                  className="w-5 absolute right-2 bottom-2"
                  src="assets/icons/spotify-logo.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
