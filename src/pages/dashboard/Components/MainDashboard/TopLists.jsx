import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchTopItems } from "../../../../services/DataFetchService";
import TopSongList from "./TopSongList";
import TopArtistsList from "./TopArtistsList";
import TopAlbumsList from "./TopAlbumsList";
import TopGenersAndRecommendations from "./TopGenersAndRecommendations";

function TopLists() {
  const getTopArtists = async () => {};

  return (
    <React.Fragment>
      <div className="flex flex-row justify-between mt-5">
        <div className="w-[45%]">
          <TopSongList />
        </div>
        <div className="w-[45%]">
          <TopArtistsList />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div className="w-[45%]">
          <TopAlbumsList />
        </div>
        <div className="w-[45%]">
          <TopGenersAndRecommendations />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TopLists;
