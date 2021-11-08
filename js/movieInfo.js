document.addEventListener("DOMContentLoaded", async () => {
    let movieID = window.location.hash.substring(1);
    if (movieID !== "") {
        let movieInfo = await OMDB.getMovieInfo(movieID);
        console.log(movieInfo);
        renderContent(movieInfo);
    }
    else {
        console.error("No movie ID specified");
    }
});

function renderContent(movieInfo) {

}