import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthState } from "../Context/AuthContextProvider";

import { getAccessToken, redirectToAuthPage } from "../services/OAuthService";
import { isAuthed } from "../helper/helpers";

import CustomTitle from "./dashboard/CustomTitle";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

function Login() {
  const { user, setUser } = AuthState();

  const [isLoaded, setLoaded] = useState(true);
  const history = useHistory();

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

  return (
    <div className="w-screen overflow-y-scroll overflow-x-hidden absolute inset-0">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-row justify-between w-full max-w-md xl:max-w-7xl items-center px-8 py-4">
          <CustomTitle loginHandler={loginHandler} />
        </div>
        <div className="hero flex flex-col justify-center mt-5 lg:mt-32">
          <div className="hero-content flex-col justify-around lg:items-start lg:flex-row py-0">
            <div className="flex flex-col justify-center items-center px-4 lg:px-0 lg:justify-start lg:items-start lg:mt-20 lg:w-[50%] ">
              <h1 className="text-4xl lg:text-5xl font-bold text-left font-[spotify-bold] leading-sung">
                The ultimate app for tracking your{" "}
                <span className="text-s_green">Spotify</span>
              </h1>
              <p className="py-2 text-left text-gray-500">
                Track your spotify activity, stats and taste in one place.
              </p>
              <button
                class="btn btn-wide btn-sm bg-s_green text-s_black font-[spotify-mid] capitalize hover:bg-s_green rounded-lg btn-md mt-3 hover:scale-105"
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
            <div className="flex flex-col justify-end relative h-full">
              <img
                src="assets/mockups/mobile.svg"
                className="max-w-sm rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full bg-base-200 px-2 lg:px-0">
        <div className="mb-10">
          <div className="px-3 mt-24 max-w-md xl:max-w-7xl">
            <h1 className="font-black font-[spotify-bold] text-3xl lg:text-4xl">
              Discover Your Music's Hidden Story
            </h1>
            <p className="py-2 text-gray-500 font-[spotify-mid] text-xl">
              Elevate your listening experience to the next level and reveal the
              hidden tales within
            </p>
          </div>
          <div className="w-full max-w-md xl:max-w-7xl items-center px-8 py-4">
            <img
              className="rounded-lg"
              src="assets/mockups/webpage.png"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-row justify-between pt-3 items-center w-[50%] bg-[#121212] w-[80%] max-w-md xl:max-w-7xl rounded-lg pl-10 lg:pl-32 lg:pt-8 mb-5">
          <div className="flex flex-col w-[60%]">
            <h1 className="text-left font-black font-[spotify-bold] text-base lg:text-4xl">
              Analyze your listening activity
            </h1>
            <p className="mb-2 lg:mb-0 lg:py-2 text-gray-500 text-left font-[spotify-mid] text-xs lg:text-xl">
              Try it now
            </p>
            <button
              class="btn btn-xs w-16 text-[9px] bg-s_green text-s_black font-[spotify-mid] self-start rounded capitalize lg:text-md hover:bg-s_green lg:rounded-lg lg:btn-wide lg:w-32 lg:btn-md lg:flex-row hover:scale-105"
              onClick={loginHandler}
            >
              {(!isLoaded && (
                <span className="loading loading-spinner"></span>
              )) || (
                <React.Fragment>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    className="w-3 lg:w-5"
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
                  Login
                </React.Fragment>
              )}
            </button>
          </div>

          <img
            className="rounded-lg w-[45%]"
            src="assets/mockups/graph.png"
            alt=""
          />
        </div>
      </div>

      <footer className="footer flex flex-row items-center justify-around bg-[#121212] text-base-content rounded pt-5 pb-5">
        <aside>
          <p className="inline text-s_green ml-2 text-base">
            Copyright © 2023 By
            <a href="https://www.linkedin.com/in/bilal-abouzid" target="_blank">
              {" "}
              @bilal-auz
            </a>
          </p>
        </aside>

        <nav className="flex flex-row">
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/bilal-auz" target="_blank">
              <img src="assets/icons/github-icon.svg" alt="" />
            </a>
            <a href="https://www.linkedin.com/in/bilal-abouzid" target="_blank">
              <img
                className="rounded-sm"
                src="assets/icons/linkedin-icon.svg"
                alt=""
              />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Login;
