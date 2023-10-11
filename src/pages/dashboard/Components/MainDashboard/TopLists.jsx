import React from "react";

function TopLists() {
  return (
    <div className="flex flex-row justify-between mt-5">
      <div className="w-[45%]">
        <h3 className="text-start ml-5 font-[spotify-bold]">Top Songs</h3>
        <div className="bg-[#19191b]">list</div>
      </div>
      <div className="w-[45%]">
        <h3 className="text-start ml-5 font-[spotify-bold]">Top Artists</h3>
        <div className="bg-[#19191b]">list</div>
      </div>
    </div>
  );
}

export default TopLists;
