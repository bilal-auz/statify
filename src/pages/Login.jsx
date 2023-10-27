import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthState } from "../Context/AuthContextProvider";
import { getAccessToken, redirectToAuthPage } from "../services/OAuthService";
import { isAuthed } from "../helper/helpers";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

function Login() {
  const { user, setUser } = AuthState();

  const [isLoaded, setLoaded] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      if (code) {
        return handleCallBack();
      } else if (await isAuthed()) {
        history.push("/dashboard");
      } else {
        setLoaded(true);
      }
    };

    init();
  }, []);

  // const checkAuth = async () => {
  //   if (
  //     !localStorage.getItem("accessToken") ||
  //     !localStorage.getItem("refreshToken")
  //   ) {
  //     console.log("No Token No refresh");
  //     return false;
  //   }

  //   if (new Date() >= new Date(localStorage.getItem("expires_in"))) {
  //     console.log("Refresh Token");
  //     const newToken = await refreshToken(localStorage.getItem("refreshToken"));
  //     localStorage.setItem("accessToken", newToken.access_token);

  //     //set new refresh_token only if its provided
  //     if (newToken.refresh_token) {
  //       localStorage.setItem("refreshToken", newToken.refresh_token);
  //     }

  //     //set new expiring date
  //     const expire_date = new Date();
  //     expire_date.setSeconds(expire_date.getSeconds() + newToken.expires_in);
  //     localStorage.setItem("expires_in", expire_date);
  //   }

  //   return true;
  // };

  const loginHandler = async () => {
    setLoaded(false);
    setUser(true);
    if (
      !code &&
      (!localStorage.getItem("accessToken") ||
        !localStorage.getItem("refreshToken"))
    ) {
      await redirectToAuthPage();
    }
  };

  const handleCallBack = async () => {
    setLoaded(false);

    const data = await getAccessToken(code);

    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);

    const expire_date = new Date();
    expire_date.setSeconds(expire_date.getSeconds() + data.expires_in);
    localStorage.setItem("expires_in", expire_date);

    history.push("/dashboard");
  };

  return (
    <div className="container flex justify-center">
      <div className="wrapper flex flex-col justify-center items-center w-fit p-2">
        <div className="flex flex-row justtify-center items-center text-5xl font-[spotify-bold] p-5">
          Statify
          <img className="w-8" src="assets/icons/statify-logo.svg" alt="" />
        </div>
        <div className="mb-2">
          <button
            class="btn btn-wide btn-sm bg-s_green text-s_black font-[spotify-mid] capitalize hover:bg-s_green rounded-lg btn-md"
            onClick={loginHandler}
          >
            {(!isLoaded && (
              <span className="loading loading-spinner"></span>
            )) || (
              <React.Fragment>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="w-5"
                >
                  <path
                    fill="#00000"
                    d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                  />
                  <path
                    fill="#1ed760"
                    d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
                  />
                </svg>
                Login with Spotify
              </React.Fragment>
            )}
          </button>
        </div>
        <div className="flex justify-end w-full px-2">
          <p className="text-right flex flex-row text-sm font-[spotify-txtBook] mr-2">
            Powered by
          </p>
          <img
            className="w-12"
            src="assets/icons/spotify-logo-text.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
