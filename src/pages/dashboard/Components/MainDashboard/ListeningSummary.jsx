import React from "react";
import TopLists from "./TopLists";
import History from "./History";

function ListeningSummary() {
  return (
    <React.Fragment>
      <div className="flex flex-row mt-8 ml-5 w-full">
        <h2 className="font-[spotify-bold]">Listening Summary</h2>
      </div>
      <div className="divider before:bg-s_white after:bg-s_white"></div>
      <TopLists />
      <History />
    </React.Fragment>
  );
}

export default ListeningSummary;
