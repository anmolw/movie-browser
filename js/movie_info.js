const movieTitle = document.getElementById("movie-title");
const plotSummary = document.getElementById("plot-summary");
const moviePoster = document.getElementById("movie-poster");
const movieYear = document.getElementById("movie-year");

document.addEventListener("DOMContentLoaded", async () => {
    const movieID = window.location.hash.substring(1);
    if (movieID !== "") {
        const movieResponse = await OMDB.getMovieInfo(movieID);
        const movieJSON = await movieResponse.json();
        console.log(movieJSON);
        renderContent(movieJSON);
    }
    else {
        console.error("No movie ID specified");
    }
});

function renderContent(movie) {
    movieTitle.innerText = movie.Title;
    movieYear.innerText = movie.Year;
    plotSummary.innerText = movie.Plot;
    if (movie.Poster !== "N/A") {
        moviePoster.setAttribute("style", `background-image: url(${movie.Poster}); background-size: cover;`);
    }
}