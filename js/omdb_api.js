// Embedding a third-party API key into client side code isn't advisable, but this is a frontend-only project
const apiKey = "6be57a27";
const omdbURL = `https://www.omdbapi.com/?apikey=${apiKey}`;

// Object containing helper functions for interacting with the OMDB API
const OMDB = {
    // Return a Response promise
    makeRequest: function (queryString) {
        return fetch(`${omdbURL}&${queryString}`);
    },
    // Make a search request
    search: function (query) {
        return this.makeRequest(`s=${query}&type=movie`);
    },
    // Get the info of a given movie ID
    getMovieInfo: function (movieID) {
        return this.makeRequest(`i=${movieID}`);
    }
};
Object.freeze(OMDB);