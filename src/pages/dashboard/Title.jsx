import React, { useEffect, useState } from "react";

function Title() {
  useEffect(() => {});
  const [fullName, setFullName] = useState("fullName");
  const [profilePic, setProfilePic] = useState("pfp");

  const getProfileInfo = async () => {
    //getPofile info
  };
  return (
    <React.Fragment>
      <div>Statify</div>
      <div>
        {fullName} {profilePic}
      </div>
    </React.Fragment>
  );
}

export default Title;
