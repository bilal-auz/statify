import CryptoJS from "crypto-js";

export function toBase64(text) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
}
