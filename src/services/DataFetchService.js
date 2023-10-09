import axios from "axios";
import { OAuthData } from "../config/OAuthConfig";

//3. Fetch Profile Data
// https://api.spotify.com/v1/me
export async function getProfileTile() {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.get(
      OAuthData.SPOTIFY_API_ENDPOINT + "/me",
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
  } catch (error) {
    console.log("Error: " + error);
  }
}
