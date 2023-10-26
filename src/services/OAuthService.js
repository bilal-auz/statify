import axios from "axios";
import { toBase64 } from "../helper/helpers";

//1. redirect To Spotify login page
export async function redirectToAuthPage() {
  console.log("start redirect");

  const params = new URLSearchParams();
  console.log(process.env.REACT_APP_CLIENT_ID);
  params.append("client_id", process.env.REACT_APP_CLIENT_ID);
  params.append("response_type", "code");
  params.append(
    "redirect_uri",
    encodeURI(process.env.REACT_APP_CALLBACK_ENDPOINT)
  );
  params.append(
    "scope",
    "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played"
  );

  document.location.href =
    process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT + "?" + params.toString();
}

//2. Get access token
export async function getAccessToken(code) {
  const BODY_PARAMS = new URLSearchParams();
  BODY_PARAMS.append("grant_type", "authorization_code");
  BODY_PARAMS.append("code", code);
  BODY_PARAMS.append(
    "redirect_uri",
    encodeURI(process.env.REACT_APP_CALLBACK_ENDPOINT)
  );

  const config = {
    headers: {
      Authorization:
        "basic " +
        toBase64(
          process.env.REACT_APP_CLIENT_ID +
            ":" +
            process.env.REACT_APP_CLIENT_SECRET
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const { data } = await axios.post(
    process.env.REACT_APP_SPOTIFY_TOKEN_ENDPOINT,
    BODY_PARAMS,
    config
  );

  /*
    {
      "access_token": "",
      "token_type": "Bearer",
      "expires_in": 3600,
      "refresh_token": "",
      "scope": ""
    }
  */
  return data;
}

//3. Refresh Token
export async function refreshToken(refresh_token) {
  const BODY_PARAMS = new URLSearchParams();
  BODY_PARAMS.append("grant_type", "refresh_token");
  BODY_PARAMS.append("refresh_token", refresh_token);

  const config = {
    headers: {
      Authorization:
        "basic " +
        toBase64(
          process.env.REACT_APP_CLIENT_ID +
            ":" +
            process.env.REACT_APP_CLIENT_SECRET
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const { data: newToken } = await axios.post(
    process.env.REACT_APP_SPOTIFY_TOKEN_ENDPOINT,
    BODY_PARAMS,
    config
  );

  return newToken;
}
