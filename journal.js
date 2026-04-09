// journal.js — Journal page logic

const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const grid = document.getElementById("journal-grid");

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

function createJournalCard(movie) {
    const card = document.createElement("div");
    card.className = "group relative overflow-hidden rounded-xl border border-surfaceBorder bg-surfaceLight transition-all duration-300 hover:border-golden/30";

    card.innerHTML =
        '<div class="relative aspect-[2/3] bg-surfaceBorder flex items-center justify-center">' +
        (movie.poster_path ? '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" class="absolute inset-0 w-full h-full object-cover" />' : '') +
        '<button class="remove-btn absolute top-2 right-2 bg-black/50 rounded-full p-1.5 hover:bg-black/80 transition-colors">' +
        '<svg class="w-4 h-4 text-golden" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '</button>' +
        '</div>' +
        '<div class="p-4 flex flex-col gap-3">' +
        '<h3 class="truncate font-display text-sm font-semibold text-textPrimary">' + movie.title + '</h3>' +
        '<div class="flex items-center gap-3 text-xs text-textMuted">' +
        '<span class="flex items-center gap-1"><svg class="w-3 h-3 text-golden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' + movie.vote_average + '</span>' +
        '<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' + (movie.release_date || "").slice(0, 4) + '</span>' +
        '</div>' +
        '<p class="mt-2 line-clamp-2 text-xs leading-relaxed text-textMuted">' + movie.overview + '</p>' +
        '<div class="notes-list overflow-y-auto max-h-24 rounded-lg border border-surfaceBorder bg-surface px-2 py-1 flex flex-col gap-1"></div>' +
        '<textarea class="note-input w-full rounded-lg border border-surfaceBorder bg-surface px-3 py-2 text-xs text-textPrimary placeholder-textMuted focus:outline-none focus:border-golden/50 resize-none" rows="2" placeholder="Add a note..."></textarea>' +
        '<button class="save-note-btn rounded-lg bg-golden px-3 py-1.5 text-xs font-medium text-surface hover:bg-goldenDark transition-colors">Save note</button>' +
        '</div>';

    const saveBtn = card.querySelector(".save-note-btn");
    const noteInput = card.querySelector(".note-input");
    const removeBtn = card.querySelector(".remove-btn");
    const notesList = card.querySelector(".notes-list");

    // Gespeicherte Notes beim Laden anzeigen
    const notes = Array.isArray(movie.notes) ? movie.notes : (movie.note ? [movie.note] : []);
    notes.forEach(function (note) {
        if (note.trim() !== "") {
            notesList.appendChild(createNoteItem(note, movie.id, notesList));
        }
    });

    saveBtn.addEventListener("click", function () {
        const noteText = noteInput.value.trim();
        if (noteText === "") return;

        const updatedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const index = updatedFavourites.findIndex(function (fav) {
            return fav.id === movie.id;
        });

        if (index !== -1) {
            if (!Array.isArray(updatedFavourites[index].notes)) {
                updatedFavourites[index].notes = [];
            }
            updatedFavourites[index].notes.push(noteText);
            localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
        }

        notesList.appendChild(createNoteItem(noteText, movie.id, notesList));
        notesList.scrollTop = notesList.scrollHeight;
        noteInput.value = "";
    });

    removeBtn.addEventListener("click", function () {
        const updatedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const filtered = updatedFavourites.filter(function (fav) {
            return fav.id !== movie.id;
        });
        localStorage.setItem("favourites", JSON.stringify(filtered));
        card.remove();

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="text-textMuted text-sm">No favourites saved yet. Go to the homepage and add some movies!</p>';
        }
    });

    return card;
}

function createNoteItem(text, movieId, notesList) {
    const item = document.createElement("div");
    item.className = "flex items-start justify-between gap-2 py-1 border-b border-surfaceBorder last:border-0";

    item.innerHTML =
        '<p class="text-xs text-white flex-1">' + text + '</p>' +
        '<button class="delete-note-btn text-textMuted hover:text-white transition-colors text-xs flex-shrink-0">✕</button>';

    const deleteBtn = item.querySelector(".delete-note-btn");
    deleteBtn.addEventListener("click", function () {
        const updatedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const index = updatedFavourites.findIndex(function (fav) {
            return fav.id === movieId;
        });

        if (index !== -1) {
            updatedFavourites[index].notes = updatedFavourites[index].notes.filter(function (n) {
                return n !== text;
            });
            localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
        }

        item.remove();
    });

    return item;
}

renderFavourites();