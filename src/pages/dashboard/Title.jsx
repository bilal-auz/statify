import React, { useEffect, useState } from "react";
import { getProfileTile } from "../../services/DataFetchService";
import { useHistory } from "react-router-dom";

function Title() {
  useEffect(() => {
    getProfileInfo();
  }, []);
  const [displayName, setDisplayName] = useState("displayName");
  const [profilePic, setProfilePic] = useState("pfp");
  const history = useHistory();

  const getProfileInfo = async () => {
    //getPofile info
    const data = await getProfileTile();
    console.log(data.images["url"]);
    setDisplayName(data.display_name);
    setProfilePic(data.images[0].url);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.go(0);
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justtify-center items-center text-2xl font-[spotify-bold]">
        Statify
        <img className="w-8" src="assets/icons/statify-logo.svg" alt="" />
      </div>
      <div className="flex flex-row justify-center items-center flex-wrap">
        <div className="mr-5 text-xl font-[spotify-txtBook]">{displayName}</div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0}>
            <img
              className="w-10 rounded-full"
              src={`${profilePic}`}
              alt="pfp"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu shadow bg-[#0c0c0c] rounded w-23 mt-2"
          >
            <li className="w-full">
              <button
                className="font-[spotify-bold] text-[#a83d3d] text-base p-0 rounded-none w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className=""></div>
      </div>
    </React.Fragment>
  );
}

export default Title;
