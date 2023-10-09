import React, { useEffect, useState } from "react";
import { getProfileTile } from "../../services/DataFetchService";

function Title() {
  useEffect(() => {
    getProfileInfo();
  }, []);
  const [displayName, setDisplayName] = useState("displayName");
  const [profilePic, setProfilePic] = useState("pfp");

  const getProfileInfo = async () => {
    //getPofile info
    const data = await getProfileTile();
    console.log(data.images["url"]);
    setDisplayName(data.display_name);
    setProfilePic(data.images[0].url);
  };
  return (
    <React.Fragment>
      <div className="flex flex-row justtify-center items-center text-2xl font-[spotify-bold]">
        Statify
        <img className="w-8" src="assets/icons/statify-logo.svg" alt="" />
      </div>
      <div className="flex flex-row justify-center items-center flex-wrap">
        <div className="mr-5 text-xl font-[spotify-txtBook]">{displayName}</div>
        <div className="">
          <img className="w-10 rounded-full" src={`${profilePic}`} alt="pfp" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Title;
