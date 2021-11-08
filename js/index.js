let timeoutRef;

document.addEventListener("DOMContentLoaded", () => {
    // Register the searchbox listener
    let searchBox = document.getElementById("search-box");
    let searchButton = document.getElementById("search-button");
    // searchButton.addEventListener("click", () => { });
    searchBox.addEventListener("input", searchBoxListener);
    searchBox.addEventListener("keyup", searchBoxEnterListener);
    // let exampleResults = `{"Search":[{"Title":"Top Gun","Year":"1986","imdbID":"tt0092099","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"},{"Title":"Top Gun","Year":"1955","imdbID":"tt0048734","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNTFiZTBiZGMtNzNmMy00NDZiLWE5MGEtZmZjN2I3NTQ3ZmExXkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SX300.jpg"},{"Title":"Danger Zone: The Making of 'Top Gun'","Year":"2004","imdbID":"tt0441613","Type":"movie","Poster":"N/A"},{"Title":"Top Gun in 60 Seconds","Year":"2010","imdbID":"tt1637998","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDk4NzQzNDE5OF5BMl5BanBnXkFtZTcwOTA3MjY1Mw@@._V1_SX300.jpg"},{"Title":"Top Gun 2: Back to Traffic School","Year":"2012","imdbID":"tt2326220","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZmZiNDVmMDgtMzIzNS00YmUzLTg2MTctOTAwYTY3NDZmYjZlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjQzNzQwNjg@._V1_SX300.jpg"},{"Title":"WWI Top Gun: Revealed","Year":"2012","imdbID":"tt2331151","Type":"movie","Poster":"N/A"},{"Title":"Best of the Best: Inside the Real Top Gun","Year":"2004","imdbID":"tt0441843","Type":"movie","Poster":"N/A"},{"Title":"Russian Top Gun","Year":"1990","imdbID":"tt0300434","Type":"movie","Poster":"N/A"},{"Title":"Top Gun: Maverick","Year":"2022","imdbID":"tt1745960","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGUwZDRjNTYtYjI0Zi00OWZjLTgxZWItZjNiZWEyYThlZTkyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"},{"Title":"Top Gun: Maverick","Year":"2022","imdbID":"tt1745960","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGUwZDRjNTYtYjI0Zi00OWZjLTgxZWItZjNiZWEyYThlZTkyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"}],"totalResults":"18","Response":"True"}`
    // renderResults(JSON.parse(exampleResults));
});

async function performSearch(query) {
    // Perform a search request and then call the render function
    let response = await OMDB.search(query);
    renderResults(response);
    console.log(response);
}

function searchBoxEnterListener(event) {
    // Called when the user presses enter in the search box
    if (event.code === "Enter" && event.target.value !== "") {
        if (timeoutRef !== undefined) {
            clearTimeout(timeoutRef);
        }
        performSearch(event.target.value);
    }
}

function renderResults(response) {
    // Renders the search results
    let resultsList = document.getElementById("results");
    clearCurrentResults();
    if (response.Response === 'True') {
        let resultElementArray = [];
        // Generate an array of result elements from the JSON results array
        response.Search.forEach(result => {
            resultElementArray.push(createResultElement(result));
        });
        resultsList.append(...resultElementArray);
    }

}

function showPlaceholders() {
    let resultsList = document.getElementById("results");
    let placeholderArray = [];
    for (let i = 0; i < 10; i++) {
        let placeholderElem = document.createElement("")
    }
    resultsList.append(placeholderArray);
}

function showAlert() {

}

function clearCurrentResults() {
    let resultsList = document.getElementById("results");
    resultsList.innerHTML = "";
}

function createResultElement(result) {
    // Creates the DOM representation of a result
    let resultElem = document.createElement("li");
    let thumbnailLink = document.createElement("a");
    let thumbnailImg = document.createElement("img");
    let info = document.createElement("span");

    thumbnailLink.href = `/movie.html#${result.imdbID}`;
    resultElem.classList.add("clearfix", "list-group-item");
    thumbnailImg.classList.add("rounded", "float-start", "movie-poster-small");
    info.innerText = `${result.Title} (${result.Year})`;

    if (result.Poster !== "N/A") {
        thumbnailImg.setAttribute("src", `${result.Poster}`);
    }

    thumbnailLink.appendChild(thumbnailImg);
    resultElem.appendChild(thumbnailLink);
    resultElem.appendChild(info);
    return resultElem;
}

function searchBoxListener(event) {
    if (event.target.value !== "") {
        if (timeoutRef !== undefined) {
            clearTimeout(timeoutRef);
        }
        // Used to limit how frequently API calls are made
        timeoutRef = setTimeout(performSearch, 300, event.target.value);
    }
    else if (timeoutRef !== undefined) {
        clearTimeout(timeoutRef);
    }
}