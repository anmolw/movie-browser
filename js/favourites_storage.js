const FavouritesStorage = {
    // Load favourites from the browser's local storage
    loadFavourites: function () {
        const favouritesObj = localStorage.getItem("favourites");
        if (!favouritesObj) {
            return [];
        }
        return JSON.parse(favouritesObj);
    },
    // Given a favourites array, save it to the browser's local storage as a JSON string
    saveFavourites: function (favourites) {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    },
    // Sort a given favourites array by movie title. Only needed when adding movies
    sortByTitle: function (favourites) {
        favourites.sort((a, b) => a.Title.localeCompare(b.Title));
    },
    // Add a given movie to the favourites list
    addFavourite: function (movieObj) {
        const favourites = this.loadFavourites();
        favourites.push(movieObj);
        this.sortByTitle(favourites);
        this.saveFavourites(favourites);
    },
    // Given a movie ID, remove it from the favourites list
    removeFavourite: function (movieID) {
        let favourites = this.loadFavourites();
        let newFavourites = favourites.filter((movie) => movie.imdbID !== movieID);
        this.saveFavourites(newFavourites);
    },
    // Check if a given movie exists in the favourites list
    containsID: function (movieID) {
        for (let movie of this.loadFavourites()) {
            if (movie.imdbID === movieID) {
                return true;
            }
        }
        return false;
    }
};
Object.freeze(FavouritesStorage);