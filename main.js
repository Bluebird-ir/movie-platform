// main.js — Index page logic

import { fetchPopularMovies, randomColors, searchMovies } from "./simulate-api.js";

const grid = document.getElementById("movies-grid");

// ===== Load Popular Movies =====
fetchPopularMovies().then(function (movies) {
    renderMovies(movies);
});

// As the fetch is not implemented yet, we are using a mock array of movies for now, but in the future we will fetch the movies from the API.
// 'movies' is an array of objects with the following properties: id, title, overview, release_date, vote_average, poster_path
// render the movies in the grid
// for each movie, create a card and add it to the grid
function renderMovies(movies) {
    grid.innerHTML = "";
    movies.forEach((movie) => {
        grid.appendChild(createMovieCard(movie));
    });
}

// ===== Movie Card Rendering =====

function getRandomColorClass() {
    const index = Math.floor(Math.random() * randomColors.length);
    return randomColors[index];
}
// movie is an object with the following properties: id, title, overview, release_date, vote_average, poster_path
// index is the index of the movie in the array
// create a card for the movie
function createMovieCard(movie) {
    // get a random Tailwind background color class for the movie
    const randomColorClass = getRandomColorClass();

    const card = document.createElement("div");
    card.className = "group relative animate-fade-in overflow-hidden rounded-xl border border-surfaceBorder bg-surfaceLight transition-all duration-300 hover:border-golden/30";

    card.innerHTML =
        // randomColorClass is a Tailwind background color class. We pick a random color to use as the background color for the movie card.
        '<div class="relative aspect-[2/3] ' + randomColorClass + ' flex items-center justify-center">' +
        // the heart button is shown in the top right corner of the card
        // it is used to add the movie to the user's journal
        // it is a button with a heart icon
        '<button class="heart-btn absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200">' +
        // the heart icon is a SVG icon with a heart shape
        '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' +
        '</button>' +
        '</div>' +
        // the movie title, vote average, and release date are displayed in the bottom of the card
        '<div class="p-4">' +
        '<h3 class="truncate font-display text-sm font-semibold text-textPrimary">' + movie.title + '</h3>' +
        '<div class="mt-1.5 flex items-center gap-3 text-xs text-textMuted">' +
        // the vote average is displayed as a star icon and the vote average value
        '<span class="flex items-center gap-1"><svg class="w-3 h-3 text-golden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' + movie.vote_average + '</span>' +
        // the release date is displayed as a calendar icon and the release date value, but only the year is displayed
        '<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' + (movie.release_date || "").slice(0, 4) + '</span>' +
        '</div>' +
        // the overview is displayed as a paragraph
        '<p class="mt-2 line-clamp-2 text-xs leading-relaxed text-textMuted">' + movie.overview + '</p>' +
        '</div>';

    // Heart button click
    const heartBtn = card.querySelector(".heart-btn");
    heartBtn.addEventListener("click", function (e) {
        console.log("heart button clicked on the movie with id:", movie.id);
    });

    return card;
}





