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
//  Search Modal Logic
const searchModal = document.getElementById('search-modal');
const openSearchBtn = document.getElementById('search-btn');
const closeSearchBtn = document.getElementById('close-search');
const modalSearchForm = document.getElementById('modal-search-form');
const modalSearchInput = document.getElementById('modal-search-input');

// Open modal
openSearchBtn.addEventListener('click', () => {
    searchModal.classList.remove('hidden');
    modalSearchInput.focus();
    document.body.style.overflow = 'hidden';
});

// Close modal
const closeModal = () => {
    searchModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

closeSearchBtn.addEventListener('click', closeModal);

// Close on background click
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal || e.target.classList.contains('backdrop-blur-md')) {
        closeModal();
    }
});

// Handle search submission
modalSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = modalSearchInput.value.trim();
    if (query) {
        const results = await fetchMovies(query);
        renderMovies(results);
        closeModal();
        // Update section title
        const titleElement = document.querySelector('h2');
        if (titleElement) titleElement.textContent = `Search results for: "${query}"`;
    }
});

function isFavourite(movieId) {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return favourites.some(function (fav) {
        return fav.id === movieId;
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    // Add hover:z-50 at the end 102 line, so the card floats above the others when hovered over
    card.className = 'group relative animate-scale-in rounded-xl border border-surfaceBorder bg-surfaceLight transition-all duration-300 hover:border-golden/40 hover:shadow-2xl hover:shadow-golden/10 hover:z-50';

    const description = movie.overview || 'No description available...';
    const alreadySaved = isFavourite(movie.id);

    card.innerHTML = `
    <div class="relative aspect-[2/3] overflow-hidden rounded-xl">
        <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750'}" 
                class="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110">
        
        <button class="heart-btn absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/60 text-textPrimary backdrop-blur-md transition-all hover:bg-heartRed hover:text-white">
            <svg class="w-5 h-5" fill="${alreadySaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        </button>
        <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
    </div>

    <div class="p-4 relative">
        <h3 class="truncate font-display text-sm font-semibold text-textPrimary mb-1">${movie.title}</h3>
        
        <div class="relative h-8 mb-3"> 
            <p class="absolute top-0 left-0 right-0 text-[11px] leading-relaxed text-textMuted line-clamp-2 group-hover:block transition-all duration-300 cursor-help bg-surfaceLight group-hover:p-3 group-hover:rounded-lg group-hover:shadow-2xl group-hover:z-50 max-h-[160px] overflow-y-auto" title="Hover to read full description">
                ${description}
            </p>
        </div>

        <div class="flex items-center justify-between text-xs font-medium pt-1">
            <div class="flex items-center gap-1">
                <span class="text-golden">★</span>
                <span class="text-textPrimary">${movie.vote_average.toFixed(1)}</span>
            </div>
            <span class="text-textMuted">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
        </div>
    </div>
    `;

    // Logic for the Favourite button 
    const heartBtn = card.querySelector(".heart-btn");
    const heartSvg = heartBtn.querySelector("svg");

    heartBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Stop propagation to prevent interference with search or other clicks
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