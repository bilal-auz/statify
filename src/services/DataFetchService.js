import axios from "axios";
import {
  calculateTimeListened,
  getCurrentUnixEpochTime,
  getTodayUnixEpoch,
} from "../helper/helpers";

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
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT + "/me",
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
//4. fetch the current playing song: /me/player/currently-playing
export async function fetchCurrentSong() {
  console.log("fetchCurrentSong");

  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT +
        "/me/player/currently-playing",
      config
    );

    console.log(data);
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}

//5. fetch top artists/tracks: me/top/
export async function fetchTopItems(
  type,
  time_range = "medium_term",
  limit = 20
) {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT +
        "/me/top/" +
        type.toLowerCase() +
        "?time_range=" +
        time_range +
        "&limit=" +
        limit,
      config
    );

    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}

// 6. Fetch recently played tracks: /me/player/recently-played
//temp default value for after param 1286799450 = 2010 (very old)
export async function fetchRecentlyPlayedTracks(
  limit = 50,
  // after = getTodayUnixEpoch()
  after = true
) {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const endpoint =
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT +
      "/me/player/recently-played?limit=" +
      limit +
      (after
        ? "&after=" + getTodayUnixEpoch()
        : "&before=" + getCurrentUnixEpochTime());

    const { data } = await axios.get(endpoint, config);

    data.timeListened = calculateTimeListened(data.items);

    console.log("timed:- ");

    console.log(data);
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}

// 7. fetch album info by id: /albums/{id}
export async function fetchAlbumInfo(albumId) {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT + "/albums/" + albumId,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

// 8. Fetch Search results: /search
export async function search(
  q,
  type = "album,track,artist,playlist",
  limit = 10
) {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT +
        "/search" +
        "?q=" +
        q +
        "&type=" +
        type +
        "&limit=" +
        limit,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

// 9. fetch recommendations: /recommendations
export async function fetchRecommendations(topTracksIds, limit = 5) {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_SPOTIFY_API_ENDPOINT +
        "/recommendations?" +
        "limit=" +
        limit +
        "&seed_tracks=" +
        topTracksIds,
      config
    );

    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}
