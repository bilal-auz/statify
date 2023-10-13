import CryptoJS from "crypto-js";

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

export function calculateTimeListened(tracks) {
  let totalMilliseconds = 0;

  tracks.forEach(({ track }) => {
    totalMilliseconds += track.duration_ms;
  });

  return {
    minutes: Math.floor(totalMilliseconds / 60000), // get the minutes
    seconds: Math.floor(totalMilliseconds / 1000) % 60, //get the seconds from the division reminder
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
