import { OAuthData } from "../config/OAuthConfig";
import axios from "axios";
import { toBase64 } from "../helper/helpers";

//1. redirect To Spotify login page
export async function redirectToAuthPage() {
  console.log("start redirect");

  const params = new URLSearchParams();
  params.append("client_id", OAuthData.CLIENT_ID);
  params.append("response_type", "code");
  params.append("redirect_uri", encodeURI(OAuthData.CALLBACK_ENDPOINT));
  params.append("scope", "user-read-private user-read-email");

  document.location.href =
    OAuthData.SPOTIFY_AUTH_ENDPOINT + "?" + params.toString();
}

//2. Get access token
export async function getAccessToken(code) {
  const BODY_PARAMS = new URLSearchParams();
  BODY_PARAMS.append("grant_type", "authorization_code");
  BODY_PARAMS.append("code", code);
  BODY_PARAMS.append("redirect_uri", encodeURI(OAuthData.CALLBACK_ENDPOINT));

  const config = {
    headers: {
      Authorization:
        "basic " +
        toBase64(OAuthData.CLIENT_ID + ":" + OAuthData.CLIENT_SECRET),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const { data } = await axios.post(
    OAuthData.SPOTIFY_TOKEN_ENDPOINT,
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

//3. Fetch Profile Data
