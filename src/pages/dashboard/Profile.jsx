import React from "react";

function Profile() {
  return (
    <div className="flex flex-col items-center mb-5 relative">
      <img
        className="w-52 duration-300 rotate-12 mt-5 mb-5 hover:-rotate-0"
        src="assets/gifs/coming_soon_coding.gif"
        alt="tst"
      />
      <p className="duration-300 -rotate-45 hover:-rotate-0 font-[spotify-light] mb-5">
        Coming Soon...
      </p>
    </div>
  );
}

export default Profile;
