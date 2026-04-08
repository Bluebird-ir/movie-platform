// main.js — Index page logic

import { fetchPopularMovies, randomColors, searchMovies } from "./simulate-api.js";

const grid = document.getElementById("movies-grid");

// ===== Load Popular Movies =====
fetchPopularMovies().then(function (movies) {
    renderMovies(movies);
});

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

function isFavourite(movieId) {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return favourites.some(function (fav) {
        return fav.id === movieId;
    });
}

function createMovieCard(movie) {
    const randomColorClass = getRandomColorClass();

    const card = document.createElement("div");
    card.className = "group relative animate-fade-in overflow-hidden rounded-xl border border-surfaceBorder bg-surfaceLight transition-all duration-300 hover:border-golden/30";

    const alreadySaved = isFavourite(movie.id);

    card.innerHTML =
        '<div class="relative aspect-[2/3] ' + randomColorClass + ' flex items-center justify-center">' +
        (movie.poster_path ? '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" class="absolute inset-0 w-full h-full object-cover" />' : '') +
        '<button class="heart-btn absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 transition-all duration-200">' +
        '<svg class="w-4 h-4" fill="' + (alreadySaved ? 'white' : 'none') + '" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' +
        '</button>' +
        '</div>' +
        '<div class="p-4">' +
        '<h3 class="truncate font-display text-sm font-semibold text-textPrimary">' + movie.title + '</h3>' +
        '<div class="mt-1.5 flex items-center gap-3 text-xs text-textMuted">' +
        '<span class="flex items-center gap-1"><svg class="w-3 h-3 text-golden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' + movie.vote_average + '</span>' +
        '<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' + (movie.release_date || "").slice(0, 4) + '</span>' +
        '</div>' +
        '<p class="mt-2 line-clamp-2 text-xs leading-relaxed text-textMuted">' + movie.overview + '</p>' +
        '</div>';

    const heartBtn = card.querySelector(".heart-btn");
    const heartSvg = heartBtn.querySelector("svg");

    heartBtn.addEventListener("click", function () {
        const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const index = favourites.findIndex(function (fav) {
            return fav.id === movie.id;
        });

        if (index !== -1) {
            favourites.splice(index, 1);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            heartSvg.setAttribute("fill", "none");
            console.log("Removed from favourites:", movie.title);
        } else {
            const movieToSave = {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                poster_path: movie.poster_path,
                note: ""
            };
            favourites.push(movieToSave);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            heartSvg.setAttribute("fill", "white");
            console.log("Added to favourites:", movie.title);
        }
    });

    return card;
}