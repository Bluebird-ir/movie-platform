// --- My API Setup ---
import { API_KEY } from "./simulate-api.js";
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// This function gets movies from the internet
async function fetchMovies(query = '') {
    // If we search for something, use search URL. If not, show popular movies.
    let url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.log("Something went wrong with API:", err);
        return [];
    }
}

// This function puts movies on our website
function renderMovies(movies) {
    const grid = document.getElementById('movies-grid');
    grid.innerHTML = ''; // Clear everything before loading

    if (!movies || movies.length === 0) {
        grid.innerHTML = '<p class="text-white text-center col-span-full">No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        grid.appendChild(movieCard);
    });
}


// Start everything
async function startApp() {
    const movies = await fetchMovies();
    renderMovies(movies);
}

startApp();


function isFavourite(movieId) {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return favourites.some(function (fav) {
        return fav.id === movieId;
    });
}

function createMovieCard(movie) {

    const card = document.createElement('div');
    // Using Leyla's Tailwind classes here
    card.className = 'group relative animate-scale-in overflow-hidden rounded-xl border border-surfaceBorder bg-surfaceLight transition-all duration-300 hover:border-golden/40 hover:shadow-2xl hover:shadow-golden/10';

    // Make description shorter (max 90 symbols)
    const description = movie.overview && movie.overview.length > 90
        ? movie.overview.substring(0, 90) + '...'
        : movie.overview || 'No description...';

    const alreadySaved = isFavourite(movie.id);

    card.innerHTML = `
    <div class="relative aspect-[2/3] overflow-hidden">
        <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750'}" 
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
        
        <button class="heart-btn absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/60 text-textPrimary backdrop-blur-md transition-all hover:bg-heartRed hover:text-white">
            <svg class="w-5 h-5" fill="${alreadySaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        </button>
        <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
    </div>

    <div class="p-4">
        <h3 class="truncate font-display text-sm font-semibold text-textPrimary mb-1">${movie.title}</h3>
        <p class="text-[11px] leading-relaxed text-textMuted line-clamp-2 mb-3 h-8">
            ${description}
        </p>
        <div class="flex items-center justify-between text-xs font-medium">
            <div class="flex items-center gap-1">
                <span class="text-golden">★</span>
                <span class="text-textPrimary">${movie.vote_average.toFixed(1)}</span>
            </div>
            <span class="text-textMuted">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
        </div>
    </div>
    `;

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