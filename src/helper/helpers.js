import CryptoJS from "crypto-js";
import { refreshToken } from "../services/OAuthService";

export function toBase64(text) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
}

export function getTodayUnixEpoch() {
  const yesterdayEnd = new Date(); //initial current date

  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1); //get yesterday date

  yesterdayEnd.setHours(23, 59, 59, 0); //set hours to the end of yesterday

  const unixTime = Math.floor(yesterdayEnd / 1000); // Convert to to unixTime

  console.log("unixTime: " + unixTime * 1000);
  return unixTime * 1000;
}

export function getCurrentUnixEpochTime() {
  const currentDate = new Date(); //initial current date

  const unixTime = Math.floor(currentDate / 1000); // Convert to to unixTime

  return unixTime * 1000;
}

export function calculateTimeListened(tracks, date = null) {
  let totalMilliseconds = 0;

  tracks.forEach(({ track }) => {
    totalMilliseconds += track.duration_ms;
  });

  return {
    tracks: tracks,
    minutes: Math.floor(totalMilliseconds / 60000), // get the minutes
    seconds: Math.floor(totalMilliseconds / 1000) % 60, //get the seconds from the division reminder
    date: date,
  };
}

export function getMostRepetitiveAlbum(tracks) {
  const topAlbums = tracks.reduce((albums, track) => {
    const albumId = track.album.id;

    if (!albums[albumId]) {
      albums[albumId] = { albumInfo: track.album, count: 0 };
    }

    albums[albumId].count += 1;

    return albums;
  }, {});

  const topAlbumsSorted = Object.entries(topAlbums);

  return topAlbumsSorted.sort((a, b) => b[1].count - a[1].count);
}

export function getMostRepetitiveGenre(artists) {
  const topGenres = artists.reduce((count, artist) => {
    const genres = artist.genres;
    genres.forEach((genre) => {
      count[genre] = (count[genre] || 0) + 1;
    });
    return count;
  }, {});

  const GenresCountArray = Object.entries(topGenres);

  return GenresCountArray.sort((a, b) => b[1] - a[1]);
}

export function getPlayedMinutesOfEachDay(tracks) {
  var timedTracks = [];
  console.log("tracks.cursors.before: " + tracks.cursors.before);
  const endDate = new Date(+tracks.cursors.before);
  const endDateGMT = new Date(endDate.toISOString().slice(0, -1));
  const currentDate = new Date();

  console.log(tracks);
  console.log(currentDate.getDate() + ">=" + endDateGMT.getDate());

  while (currentDate.getDate() >= endDateGMT.getDate()) {
    console.log(currentDate.getDate());
    var sameDayTracks = tracks.items.filter((track) => {
      const trackDate = new Date(track.played_at);
      trackDate.setUTCSeconds(0);
      trackDate.setUTCMinutes(0);
      trackDate.setUTCHours(0);

      return (
        trackDate.getDate() === currentDate.getDate() &&
        trackDate.getMonth() === currentDate.getMonth() &&
        trackDate.getFullYear() === currentDate.getFullYear()
      );
    });

    sameDayTracks = calculateTimeListened(sameDayTracks, new Date(currentDate));

    timedTracks = timedTracks.concat(sameDayTracks);

    currentDate.setDate(currentDate.getDate() - 1);
  }

  return timedTracks;
}

export function timeAgo(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const secondsAgo = Math.floor((currentDate - inputDate) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
}

export const isAuthed = async () => {
  if (
    !localStorage.getItem("accessToken") ||
    !localStorage.getItem("refreshToken")
  ) {
    console.log("No Token No refresh");
    return false;
  }

  if (new Date() >= new Date(localStorage.getItem("expires_in"))) {
    console.log("Refresh Token");
    const newToken = await refreshToken(localStorage.getItem("refreshToken"));
    localStorage.setItem("accessToken", newToken.access_token);

    //set new refresh_token only if its provided
    if (newToken.refresh_token) {
      localStorage.setItem("refreshToken", newToken.refresh_token);
    }

    //set new expiring date
    const expire_date = new Date();
    expire_date.setSeconds(expire_date.getSeconds() + newToken.expires_in);
    localStorage.setItem("expires_in", expire_date);
  }

  return true;
};
