import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchTopItems } from "../../../../services/DataFetchService";
import TopSongList from "./TopSongList";
import TopArtistsList from "./TopArtistsList";

function TopLists() {
  const getTopArtists = async () => {};

  return (
    <div className="flex flex-row justify-between mt-5">
      <div className="w-[45%]">
        <TopSongList />
      </div>
      <div className="w-[45%]">
        <TopArtistsList />
      </div>
    </div>
  );
}

export default TopLists;
