// UI Elements
const movieTitle = document.getElementById("movie-title");
const plotSummary = document.getElementById("plot-summary");
const moviePoster = document.getElementById("movie-poster");
const movieYear = document.getElementById("movie-year");
const movieRating = document.getElementById("movie-rating");
const ageRating = document.getElementById("age-rating");
const movieRuntime = document.getElementById("movie-runtime");
const favouriteButton = document.getElementById("favourite-button");

// Main function for a single movie page
// Fetches movie information based on the movieID present after the # in the URL
async function init() {
    const movieID = window.location.hash.substring(1);
    if (movieID !== "") {
        const movieResponse = await OMDB.getMovieInfo(movieID);
        const movieJSON = await movieResponse.json();
        console.log(movieJSON);
        renderContent(movieJSON);
        initializeFavouriteButton(movieJSON);
    }
    else {
        console.error("No movie ID specified");
    }
};

// Initialize the state of the favourite button & register event listener
function initializeFavouriteButton(movie) {
    favouriteButton.classList.remove("placeholder", "col-3", "disabled");
    if (FavouritesStorage.containsID(movie.imdbID)) {
        favouriteButton.innerText = "Remove from favourites";
    }
    else {
        favouriteButton.innerText = "Add to favourites";
    }
    favouriteButton.addEventListener("click", () => {
        if (!FavouritesStorage.containsID(movie.imdbID)) {
            FavouritesStorage.addFavourite(movie);
            favouriteButton.innerText = "Remove from favourites";
        }
        else {
            FavouritesStorage.removeFavourite(movie.imdbID);
            favouriteButton.innerText = "Add to favourites";
        }
    });
}

// Render the movie info once it has been fetched from the API
function renderContent(movie) {
    document.title = movie.Title;
    movieTitle.innerText = movie.Title;
    movieYear.innerText = movie.Year;
    if (movie.Plot !== "N/A") {
        plotSummary.innerText = movie.Plot;
    }
    else {
        plotSummary.innerText = "";
    }
    if (movie.imdbRating !== "N/A") {
        let ratingIcon = document.createElement("i");
        ratingIcon.classList.add("fas", "fa-star", "rating-icon");
        movieRating.appendChild(ratingIcon);
        movieRating.append(movie.imdbRating);
    }
    if (movie.Runtime !== "N/A") {
        movieRuntime.innerText = movie.Runtime;
    }
    if (movie.Rated !== "N/A") {
        ageRating.innerText = movie.Rated;
        ageRating.classList.add("visible");
    }
    if (movie.Poster !== "N/A") {
        moviePoster.setAttribute("style", `background-image: url(${movie.Poster}); background-size: cover;`);
    }
}

init();