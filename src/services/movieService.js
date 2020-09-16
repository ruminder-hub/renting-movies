import http from "./httpService";
import { apiUrl } from "./config.json";

export function getMovies() {
  //   const { data: movies } = http.get(config.apiEndPoint + "/api/movies");
  //   console.log(movies);
  //   return movies;
  return http.get(apiUrl + "/api/movies");
}

export function deleteMovie(movieId) {
  return http.delete(apiUrl + "/api/movies/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiUrl + "/api/movies/" + movie._id, body);
  }
  return http.post(apiUrl + "/api/movies", movie);
}

export function getMovie(movieId) {
  return http.get(apiUrl + "/api/movies/" + movieId);
}
