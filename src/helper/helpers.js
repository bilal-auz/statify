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

  return Math.round(totalMilliseconds / 1000 / 60); //return minutes
}
