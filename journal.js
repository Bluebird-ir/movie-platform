// journal.js — Journal page logic

// 1. Get favourites from localStorage
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const grid = document.getElementById("journal-grid");

// 2. Render favourites
function renderFavourites() {
    grid.innerHTML = "";

    if (favourites.length === 0) {
        grid.innerHTML = '<p class="text-textMuted text-sm">No favourites saved yet. Go to the homepage and add some movies!</p>';
        return;
    }

    favourites.forEach(function (movie) {
        grid.appendChild(createJournalCard(movie));
    });
}

// 3. Create a card for each favourite
function createJournalCard(movie) {
    const card = document.createElement("div");
    card.className = "overflow-hidden rounded-xl border border-surfaceBorder bg-surfaceLight p-4 flex flex-col gap-3";

    card.innerHTML =
        '<div class="flex items-start gap-4">' +
            '<div class="flex-1">' +
                '<h3 class="font-display text-sm font-semibold text-textPrimary">' + movie.title + '</h3>' +
                '<div class="mt-1 flex items-center gap-3 text-xs text-textMuted">' +
                    '<span class="flex items-center gap-1"><svg class="w-3 h-3 text-golden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' + movie.vote_average + '</span>' +
                    '<span>' + (movie.release_date || "").slice(0, 4) + '</span>' +
                '</div>' +
                '<p class="mt-2 text-xs leading-relaxed text-textMuted line-clamp-2">' + movie.overview + '</p>' +
            '</div>' +
        '</div>' +
        '<textarea class="note-input w-full rounded-lg border border-surfaceBorder bg-surface px-3 py-2 text-xs text-textPrimary placeholder-textMuted focus:outline-none focus:border-golden/50 resize-none" rows="3" placeholder="Add a note...">' + movie.note + '</textarea>' +
        '<button class="save-note-btn rounded-lg bg-golden px-3 py-1.5 text-xs font-medium text-surface hover:bg-goldenDark transition-colors">Save note</button>';

    // Save note
    const saveBtn = card.querySelector(".save-note-btn");
    const noteInput = card.querySelector(".note-input");

    saveBtn.addEventListener("click", function () {
        const updatedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const index = updatedFavourites.findIndex(function (fav) {
            return fav.id === movie.id;
        });

        if (index !== -1) {
            updatedFavourites[index].note = noteInput.value;
            localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
            console.log("Note saved for:", movie.title);
        }
    });

    return card;
}

renderFavourites();