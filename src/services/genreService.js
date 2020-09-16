import http from "./httpService";
import { apiUrl } from "./config.json";

export function getGenres() {
  //   const { data: genres } = http.get(config.apiEndPoint + "/api/genres");
  //   console.log(genres);
  //   return genres;
  return http.get(apiUrl + "/api/genres");
}
