import React from "react";
import TopSongList from "./TopSongList";
import TopArtistsList from "./TopArtistsList";
import TopAlbumsList from "./TopAlbumsList";
import TopGenersAndRecommendations from "./TopGenersAndRecommendations";

function TopLists() {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-between mt-1 xl:mt-5 xl:flex-row">
        <div className="w-full xl:w-[45%]">
          <TopSongList />
        </div>
        <div className="w-full mt-5 xl:w-[45%] xl:mt-0">
          <TopArtistsList />
        </div>
      </div>
      <div className="flex flex-col justify-between mt-5 xl:flex-row">
        <div className="w-full xl:w-[45%] mt-5 xl:mt-0">
          <TopAlbumsList />
        </div>
        <div className="w-full xl:w-[45%] mt-5 xl:mt-0">
          <TopGenersAndRecommendations />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TopLists;
