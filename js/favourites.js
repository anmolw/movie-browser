const favouritesList = document.getElementById("favourites-list");

// Load favourites from local storage and render them
function init() {
    let favouritesArray = [];
    for (let movie of FavouritesStorage.loadFavourites()) {
        let movieCard = createMovieCard(movie, function () {
            if (!this.checked) {
                console.log(this.parentElement.parentElement);
                favouritesList.removeChild(movieCard);
            }
        });
        favouritesArray.push(movieCard);
    }
    favouritesList.append(...favouritesArray);
}

init();

