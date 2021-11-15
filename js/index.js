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

// Function that returns a debounced version of another function
// Used to limit the number of API queries sent
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
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

const debouncedSearch = debounce(performSearch, 300);


function searchBoxInputListener(event) {

    // If there is a pending search request that has not been sent yet, cancel it
    clearTimeout(timeoutRef);

    if (searchBox.value !== "") {
        // Used to limit how frequently API calls are made
        // Waits 300ms before sending a search request to the OMDB API
        timeoutRef = setTimeout(performSearch, 300, searchBox.value);
    }
    else {
        clearCurrentResults();
    }
}

function searchBoxKeyListener(event) {
    // Perform a search when the user presses enter
    if (event.code === "Enter" && searchBox.value !== "") {
        clearTimeout(timeoutRef);
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
            resultElementArray.push(createMovieCard(result));
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

init();