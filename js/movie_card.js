// Creates a movie card. This function is used by the index page
// and the favourites page
function createMovieCard(movie, favBtnCallback) {
    // Create parent element & children
    let parentElem = document.createElement("div");
    let movieCard = document.createElement("div");
    let posterLink = document.createElement("a");
    let posterContainer = document.createElement("div");
    // let posterImg = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h6");
    let cardSubtitle = document.createElement("p");
    let yearText = document.createElement("span");
    let favouriteButtonElem = document.createElement("span");
    let favouriteButtonInput = document.createElement("input");
    let favouriteButtonLabel = document.createElement("label");

    // Add css classes
    parentElem.classList.add("col");
    movieCard.classList.add("card", "mb-2", "shadow-sm", "rounded-3");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardSubtitle.classList.add("card-subtitle", "d-flex");
    favouriteButtonElem.classList.add("favourite-button", "ml-auto");
    favouriteButtonInput.classList.add("btn-check");
    favouriteButtonLabel.classList.add("btn", "btn-sm", "btn-outline-danger", "far", "fa-heart");
    posterContainer.classList.add("card-img-top", "poster-container");

    //Set element properties
    posterLink.href = `movie.html#${movie.imdbID}`;
    cardTitle.setAttribute("title", `${movie.Title}`);
    favouriteButtonInput.setAttribute("type", "checkbox");
    favouriteButtonInput.setAttribute("id", `btn-check-${movie.imdbID}`);
    favouriteButtonLabel.setAttribute("for", `btn-check-${movie.imdbID}`);

    // Set the status of the favourite checkbox
    favouriteButtonInput.checked = FavouritesStorage.containsID(movie.imdbID);
    // Toggle the favourite status of the movie when the favourite button is pressed
    favouriteButtonInput.addEventListener("change", (e) => {
        if (favouriteButtonInput.checked) {
            FavouritesStorage.addFavourite(movie);
        }
        else {
            FavouritesStorage.removeFavourite(movie.imdbID);
        }
    });

    // If an additional listener for the favourite button is provided, register it
    if (favBtnCallback) {
        favouriteButtonInput.addEventListener("change", favBtnCallback);
    }

    // Set the content of inner elements
    cardTitle.innerText = `${movie.Title}`;
    yearText.innerText = `${movie.Year}`;

    // Set the movie poster image URL if it exists
    if (movie.Poster !== "N/A") {
        posterContainer.setAttribute("style", `background-image: url(${movie.Poster}); background-size: cover;`);
        // posterImg.setAttribute("src", `${movie.Poster}`);
    }

    // Set up element hierarchy
    posterLink.appendChild(posterContainer);
    // posterContainer.appendChild(posterImg);
    favouriteButtonElem.appendChild(favouriteButtonInput);
    favouriteButtonElem.appendChild(favouriteButtonLabel);
    cardSubtitle.appendChild(yearText);
    cardSubtitle.appendChild(favouriteButtonElem);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    movieCard.appendChild(posterLink);
    movieCard.appendChild(cardBody);
    parentElem.appendChild(movieCard);
    // Return the created element
    return parentElem;
}