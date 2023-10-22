import React, { useEffect, useState } from "react";
import {
  fetchAlbumInfo,
  fetchCurrentSong,
  fetchRecentlyPlayedTracks,
  fetchTopItems,
  search,
} from "../../../../services/DataFetchService";
import {
  getMostRepetitiveAlbum,
  getMostRepetitiveGenre,
} from "../../../../helper/helpers";

function HeaderSection() {
  const [currentSong, setCurrentSong] = useState({});
  const [topTrack, setTopTrack] = useState({});
  const [topArtist, setTopArtist] = useState({});
  const [topAlbum, setTopAlbum] = useState({});
  const [topGenre, setTopGenre] = useState({});
  const [songListenedStats, setSongListenedStats] = useState({});

  useEffect(() => {
    getCurrentSong();
    getNumberOfSongPlayed();
    getTopTrack();
    getTopArtist();
    getTopAlbum();
    getTopGenre();
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

  const getTopAlbum = async () => {
    const topAlbumData = {
      name: "",
      albumCover: "",
      linkToAlbum: "",
    };

    const data = await fetchTopItems("tracks", "medium_term", 50);

    const topAlbums = getMostRepetitiveAlbum(data.items); //sorted topAlbumsIds[0][0]: album id, topAlbumsIds[0][1]: repetition number

    topAlbumData.name = topAlbums[0][1].albumInfo.name;
    topAlbumData.albumCover = topAlbums[0][1].albumInfo.images[2].url;
    topAlbumData.linkToAlbum = topAlbums[0][1].albumInfo.external_urls.spotify;

    setTopAlbum(topAlbumData);
  };

  const getTopGenre = async () => {
    const topGenreData = {
      name: "",
      cover: "",
    };

    const data = await fetchTopItems("artists", "medium_term", 50);
    const topGeneres = getMostRepetitiveGenre(data.items); //sorted topGeneres[0][0]: genre Name, topGeneres[0][1]: repetition number

    const GenreSearchData = await search(topGeneres[0][0], "playlist", 1);

    topGenreData.name = topGeneres[0][0];
    topGenreData.cover = GenreSearchData.playlists.items[0].images[0].url;

    setTopGenre(topGenreData);
  };

  const getNumberOfSongPlayed = async () => {
    const data = await fetchRecentlyPlayedTracks(50, true);

    console.log(data);

    setSongListenedStats({
      numberOfSongListened: data.items.length,
      timeListened: data.timeListened,
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex justify-center bg-[#19191b] rounded-lg relative mb-5">
          <div className="flex flex-row p-4 w-[360px] min-h-[88px] items-center justify-center">
            {(currentSong == null && (
              <div className="text-base font-[spotify-bold]">
                Quiet for a while... 💤💤
              </div>
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

        <div className="flex justify-between relative w-[360px] max-h-[88px]">
          <div className="flex justify-center bg-[#19191b] rounded-lg relative w-[45%]">
            <div className="flex flex-col p-4 items-center justify-center">
              <p className="font-[spotify-mid] text-sm text-[#a7a7a7]">
                Song Listened
              </p>
              <div class="flex flex-row justify-center items-center w-full">
                {/* <div class="w-8">
                  <img
                    className="rounded-[3px] bg-s_green"
                    src={"assets/songsCounter.svg"}
                  />
                </div> */}
                <div className="w-fit">
                  <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="countdown">
                      #
                      <span
                        style={{
                          "--value": 0 + songListenedStats.numberOfSongListened,
                        }}
                      ></span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-[#19191b] rounded-lg relative w-[45%]">
            <div className="flex flex-col p-4 items-center justify-center">
              <p className="font-[spotify-mid] text-sm text-[#a7a7a7]">
                Time Listened
              </p>

              <div className="flex flex-row justify-between items-center w-full">
                {/* <div class="w-8">
                  <img
                    className="rounded-[3px] bg-s_green w-12 p-2"
                    src={"assets/timeListened.svg"}
                  />
                </div> */}
                <div className="w-fit">
                  <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="countdown font-mono text-2xl">
                      <span
                        style={{
                          "--value":
                            0 + songListenedStats.timeListened?.minutes,
                        }}
                      ></span>
                      m
                      <span
                        style={{
                          "--value":
                            0 + songListenedStats.timeListened?.seconds,
                        }}
                      ></span>
                      s
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center bg-[#19191b] rounded-lg relative mb-5">
          <div className="flex flex-row p-4 w-[360px] items-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img className="rounded-[3px]" src={topTrack.albumCover} />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Top track in &#123;last-Duration&#125;
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

        <div className="flex justify-center bg-[#19191b] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img className="rounded-[3px]" src={topAlbum.albumCover} />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Top Album in &#123;last-Duration&#125;
              </p>
              <div className="w-full">
                <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                  {topAlbum.name}
                </p>
              </div>
              <a href={topAlbum.linkToAlbum} className="hidden">
                <img
                  className="w-5 absolute right-2 bottom-2"
                  src="assets/icons/spotify-logo.svg"
                  alt="currentTopSong"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center bg-[#19191b] rounded-lg relative mb-5">
          <div className="flex flex-row p-4 w-[360px] items-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img className="rounded-[3px]" src={topArtist.artistCover} />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Top Artist in &#123;last-Duration&#125;
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
        <div className="flex justify-center bg-[#19191b] rounded-lg relative">
          <div className="flex flex-row p-4 w-[360px] items-center">
            <div class="flex justify-center items-center">
              <div class="w-12">
                <img className="rounded-[3px]" src={topGenre?.cover} />
              </div>
            </div>
            <div className="flex flex-col items-start ml-4 w-4/5">
              <p className="font-[spotify-mid] text-base text-[#a7a7a7]">
                Top Genre in &#123;last-Duration&#125;
              </p>
              <div className="w-full">
                <p className="text-start font-[spotify-mid] text-2xl text-ellipsis overflow-hidden whitespace-nowrap">
                  {topGenre.name}
                </p>
              </div>
              {/* <a href={topArtist.linkToArtist} className="hidden">
                <img
                  className="w-5 absolute right-2 bottom-2"
                  src="assets/icons/spotify-logo.svg"
                  alt=""
                />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HeaderSection;
