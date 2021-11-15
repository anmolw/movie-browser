let timeoutRef;
// References to important UI elements
const resultsList = document.getElementById("results");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
let lastSearchValue = "";


function init() {
    // Register the searchbox listener
    // searchBox.addEventListener("input", searchBoxInputListener);
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
        console.error(`Error while performing search: ${error}`);
    }

}

function searchBoxInputListener(event) {

    // If there is a pending search request that has not been sent yet, cancel it
    clearTimeout(timeoutRef);

    if (searchBox.value !== "") {
        // Used to limit how frequently API calls are made
        // Waits 300ms before sending a search request to the OMDB API

    }
    else {
        clearCurrentResults();
    }
}

function searchBoxKeyListener(event) {
    if (searchBox.value !== lastSearchValue) {
        lastSearchValue = searchBox.value;
        clearTimeout(timeoutRef);
        if (searchBox.value !== "") {
            timeoutRef = setTimeout(performSearch, 300, searchBox.value);
        }
        else {
            clearCurrentResults();
        }
    }
    else if (event.keyCode === "Escape") {
        lastSearchValue = "";
        searchBox.value = "";
        clearCurrentResults();
    }
}

function renderResults(response) {
    // Renders the search results
    clearCurrentResults();
    if (response.Response === 'True') {
        let resultElementArray = [];
        // Generate an array of result elements from the JSON results array
        response.Search.forEach(result => {
            resultElementArray.push(createMovieCard(result));
        });
        // Add all elements from the results array to the results list
        resultsList.append(...resultElementArray);
    }
    else {
        showAlert(`Error: ${response.Error}`);
    }

}

// Display an alert with the provided message
function showAlert(message) {
    let currentAlert = resultsList.querySelector("#alert");
    if (currentAlert) {
        resultsList.removeChild(currentAlert);
    }
    let alertElem = document.createElement("div");
    alertElem.id = "alert";
    alertElem.classList.add("col", "alert", "alert-danger", "mx-auto", "text-center");
    alertElem.innerText = message;
    resultsList.appendChild(alertElem);
}

function clearCurrentResults() {
    resultsList.innerHTML = "";
}

init();