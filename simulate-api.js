// api.js — Empty fetch functions, ready for a real movie API (e.g. TMDB)

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
    // help: https://developer.themoviedb.org/reference/movie-popular-list
    // TODO: Replace with a real API call
    return Promise.resolve([
        { id: 1, title: "Interstellar", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster_path: "", release_date: "2014-11-07", vote_average: 8.7 },
        { id: 2, title: "Inception", overview: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.", poster_path: "", release_date: "2010-07-16", vote_average: 8.4 },
        { id: 3, title: "The Dark Knight", overview: "Batman raises the stakes in his war on crime with the help of allies.", poster_path: "", release_date: "2008-07-18", vote_average: 9.0 },
        { id: 4, title: "Pulp Fiction", overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.", poster_path: "", release_date: "1994-10-14", vote_average: 8.9 },
        { id: 5, title: "The Shawshank Redemption", overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", poster_path: "", release_date: "1994-09-23", vote_average: 9.3 },
        { id: 6, title: "Fight Club", overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.", poster_path: "", release_date: "1999-10-15", vote_average: 8.4 },
        { id: 7, title: "Forrest Gump", overview: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.", poster_path: "", release_date: "1994-07-06", vote_average: 8.8 },
        { id: 8, title: "The Matrix", overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines.", poster_path: "", release_date: "1999-03-31", vote_average: 8.7 },
        { id: 9, title: "Goodfellas", overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his associates.", poster_path: "", release_date: "1990-09-19", vote_average: 8.7 },
        { id: 10, title: "Parasite", overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", poster_path: "", release_date: "2019-05-30", vote_average: 8.5 },
    ]);
}

export function searchMovies(query) {
    // help: https://developer.themoviedb.org/reference/search-movie
    // TODO: Replace with a real API call
    return fetchPopularMovies().then(function (movies) {
        return movies.filter(function (m) {
            return m.title.toLowerCase().includes(query.toLowerCase());
        });
    });
}
