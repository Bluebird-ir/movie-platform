// simulate-api.js — Real TMDB API calls

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmZiYzdhOTc2M2ZkMDUwNThiOThkYTJiM2M2NTJhMiIsIm5iZiI6MTc3NTUwOTAxMi4yMzQsInN1YiI6IjY5ZDQxZTE0OGIzZGU4OGE2MzNlM2E1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vq5vRFCiVWz7SJ1fh3UfzFwzAdmkhIzsYQ7F7pFWeNY";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
    Authorization: "Bearer " + ACCESS_TOKEN,
    "Content-Type": "application/json"
};

export const randomColors = [
    "bg-amber-900/60",
    "bg-blue-900/60",
    "bg-emerald-900/60",
    "bg-rose-900/60",
    "bg-violet-900/60",
    "bg-cyan-900/60",
    "bg-fuchsia-900/60",
    "bg-lime-900/60",
];

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