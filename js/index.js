// Search timeout reference. Used to debounce API requests
let timeoutRef;
// References to important UI elements
const resultsList = document.getElementById("results");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
// The last value of the search box
let lastSearchValue = "";


function init() {
    // Register the searchbox listener
    searchBox.addEventListener("input", searchBoxKeyListener);
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

// Listens for changes to the search box value
function searchBoxKeyListener(event) {
    // Only perform a search if the value has changed
    if (searchBox.value !== lastSearchValue) {
        lastSearchValue = searchBox.value;
        // Clear a pending API request if it exists
        clearTimeout(timeoutRef);
        if (searchBox.value !== "") {
            // Wait 300ms before sending a search request to the API
            timeoutRef = setTimeout(performSearch, 300, searchBox.value);
        }
        else {
            clearCurrentResults();
        }
    }
}


// Renders the search results
function renderResults(response) {
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

// Clear the list of results
function clearCurrentResults() {
    resultsList.innerHTML = "";
}

init();