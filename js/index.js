let timeoutRef;
// References to important UI elements
const resultsList = document.getElementById("results");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");


function init() {
    // Register the searchbox listeners
    searchBox.addEventListener("input", searchBoxInputListener);
    searchBox.addEventListener("keyup", searchBoxKeyListener);
}

async function performSearch(query) {
    // Perform a search request and then call the render function
    try {
        let response = await OMDB.search(query);
        let json = await response.json();
        renderResults(json);
        console.log(json);
    } catch (error) {
        console.error(error);
    }

}

function searchBoxInputListener(event) {
    if (searchBox.value !== "") {
        // If there is a pending search request that has not been sent yet, cancel it
        if (timeoutRef !== undefined) {
            clearTimeout(timeoutRef);
            timeoutRef = undefined;
        }
        // Used to limit how frequently API calls are made
        // Waits 300ms before sending a search request to the OMDB API
        timeoutRef = setTimeout(performSearch, 300, searchBox.value);
    }
    else if (timeoutRef !== undefined) {
        clearTimeout(timeoutRef);
    }
}

function searchBoxKeyListener(event) {
    // Called when the user presses enter in the search box
    if (event.code === "Enter" && searchBox.value !== "") {
        if (timeoutRef !== undefined) {
            clearTimeout(timeoutRef);
        }
        performSearch(searchBox.value);
    }
    // Clear the search box when the user presses escape
    if (event.code === "Escape") {
        searchBox.value = "";
    }
}

function renderResults(response) {
    // Renders the search results
    clearCurrentResults();
    if (response.Response === 'True') {
        let resultElementArray = [];
        // Generate an array of result elements from the JSON results array
        response.Search.forEach(result => {
            resultElementArray.push(createResultElement(result));
        });
        // Add all elements from the results array to the results list
        resultsList.append(...resultElementArray);
    }

}

function showPlaceholders() {
    let placeholderArray = [];
    for (let i = 0; i < 10; i++) {
        let placeholderElem = document.createElement("");
    }
    resultsList.append(...placeholderArray);
}

function showAlert() {

}

function clearCurrentResults() {
    resultsList.innerHTML = "";
}

function createPlaceHolder() {
    // Creates a placeholder element
    let resultElem = document.createElement("div");
    let resultCard = document.createElement("div");
    let posterLink = document.createElement("a");
    let posterContainer = document.createElement("div");
    let posterImg = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h6");
    let cardSubtitle = document.createElement("p");
    let favouriteButton = document.createElement("input");
    let favouriteButtonLabel = document.createElement("label");

    // Add css classes
    resultElem.classList.add("col");
    resultCard.classList.add("card", "mb-2");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardSubtitle.classList.add("card-subtitle", "text-muted");
    favouriteButton.classList.add("favourite-button", "btn-check");
    favouriteButtonLabel.classList.add("btn", "btn-sm", "btn-outline-danger", "far", "fa-heart");
    posterLink.href = `/movie.html#${result.imdbID}`;
    posterContainer.classList.add("card-img-top", "poster-container");

    //Set miscellaneous properties
    favouriteButton.setAttribute("type", "checkbox");
    favouriteButton.setAttribute("id", `btn-check-${result.imdbID}`);
    favouriteButtonLabel.setAttribute("for", `btn-check-${result.imdbID}`);

    // Set the content of inner elements
    cardTitle.innerText = `${result.Title}`;
    cardSubtitle.innerText = `${result.Year}`;

    if (result.Poster !== "N/A") {
        posterImg.setAttribute("src", `${result.Poster}`);
    }

    posterLink.appendChild(posterContainer);
    posterContainer.appendChild(posterImg);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(favouriteButton);
    cardBody.appendChild(favouriteButtonLabel);
    resultCard.appendChild(posterLink);
    resultCard.appendChild(cardBody);
    resultElem.appendChild(resultCard);
    return resultElem;
}

function createResultElement(result) {
    // Creates the DOM representation of a result
    let resultElem = document.createElement("div");
    let resultCard = document.createElement("div");
    let posterLink = document.createElement("a");
    let posterContainer = document.createElement("div");
    let posterImg = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h6");
    let cardSubtitle = document.createElement("p");
    let favouriteButton = document.createElement("input");
    let favouriteButtonLabel = document.createElement("label");

    // Add css classes
    resultElem.classList.add("col");
    resultCard.classList.add("card", "mb-2");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardSubtitle.classList.add("card-subtitle", "text-muted");
    favouriteButton.classList.add("favourite-button", "btn-check");
    favouriteButtonLabel.classList.add("btn", "btn-sm", "btn-outline-danger", "far", "fa-heart");
    posterLink.href = `/movie.html#${result.imdbID}`;
    posterContainer.classList.add("card-img-top", "poster-container");

    //Set miscellaneous properties
    favouriteButton.setAttribute("type", "checkbox");
    favouriteButton.setAttribute("id", `btn-check-${result.imdbID}`);
    favouriteButtonLabel.setAttribute("for", `btn-check-${result.imdbID}`);

    // Set the content of inner elements
    cardTitle.innerText = `${result.Title}`;
    cardSubtitle.innerText = `${result.Year}`;

    if (result.Poster !== "N/A") {
        posterImg.setAttribute("src", `${result.Poster}`);
    }

    posterLink.appendChild(posterContainer);
    posterContainer.appendChild(posterImg);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(favouriteButton);
    cardBody.appendChild(favouriteButtonLabel);
    resultCard.appendChild(posterLink);
    resultCard.appendChild(cardBody);
    resultElem.appendChild(resultCard);
    return resultElem;
}


init();