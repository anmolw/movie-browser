// Embedding a third-party API key into client side code isn't advisable, but this is a frontend-only project
const apiKey = "6be57a27";
const omdbURL = `https://www.omdbapi.com/?apikey=${apiKey}`;

// Object containing helper functions for interacting with the OMDB API
const OMDB = {
    makeRequest: function (queryString) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", `${omdbURL}&${queryString}`);
            request.addEventListener("load", function () {
                // Something went wrong. Reject the promise
                if (this.status !== 200) {
                    reject();
                }
                else {
                    // Parse the response JSON and return it
                    resolve(JSON.parse(this.responseText));
                }
            });
            request.send();
        });
    },
    search: function (query) {
        return this.makeRequest(`s=${query}&type=movie`);
    },
    getMovieInfo: function (movieID) {
        return this.makeRequest(`i=${movieID}`);
    }
};
Object.freeze(OMDB);