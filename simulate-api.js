export const API_KEY = "API-KEY";
const ACCESS_TOKEN = "ACCESS_TOKEN";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
    Authorization: "Bearer " + ACCESS_TOKEN,
    "Content-Type": "application/json"
};

// This function is never invoked, as Yusif implemeted the same functionality in 'main.js', inside 'fetchMovies' function.
export function fetchPopularMovies() {
    return fetch(BASE_URL + "/movie/popular", { headers: headers })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            return data.results;
        });
}

export function searchMovies(query) {
    return fetch(BASE_URL + "/search/movie?query=" + encodeURIComponent(query), { headers: headers })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data.results;
        });
}