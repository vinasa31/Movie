
// LOAD MOVIE DATA FROM JSON
let movieData = null;
let allMovies = [];

async function loadMovies() {

    try {

        const response = await fetch("DATA/movies.json");

        if (!response.ok) {
            throw new Error("Cannot load movies.json");
        }

        movieData = await response.json();

        // Collect all movies
        allMovies = movieData.sections.flatMap(
            section => section.movies || []
        );

        // Display original movie sections
        movieData.sections.forEach(section => {

            const container = document.getElementById(section.id);

            if (container) {
                renderMovies(container, section.movies);
            }

        });

        // Display saved favorites separately
        renderMyList();

    } catch (error) {

        console.error("Movie loading error:", error);

    }

}


// =====================================
// CREATE MOVIE CARDS
// =====================================

function renderMovies(container, movies) {

    container.innerHTML = "";

    movies.forEach(movie => {

        const card = document.createElement("div");

        card.className = "movie-card";

        // Store movie information in data attributes
        card.dataset.title = movie.title;
        card.dataset.category = movie.category;
        card.dataset.rating = movie.rating;
        card.dataset.description = movie.description;
        card.dataset.image = movie.image;

        // Create poster
        const poster = document.createElement("div");
        poster.className = "poster";

        const img = document.createElement("img");
        img.src = movie.image;
        img.alt = movie.title;
        img.loading = "lazy";

        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = "⭐ " + movie.rating;

        poster.appendChild(img);
        poster.appendChild(badge);

        // Create favorite button
        const favoriteBtn = document.createElement("button");

        favoriteBtn.className = "favorite-btn";

        // Check whether this movie is already favorited
        favoriteBtn.innerHTML = isFavorite(movie.id) ? "♥" : "♡";

        if (isFavorite(movie.id)) {
        favoriteBtn.classList.add("active");
        }

        // Favorite button click
        favoriteBtn.addEventListener("click", function(event) {

        // Prevent opening the movie detail page
         event.stopPropagation();

         toggleFavorite(movie.id);

         // Update the heart
        favoriteBtn.innerHTML = isFavorite(movie.id) ? "♥" : "♡";

        favoriteBtn.classList.toggle("active", isFavorite(movie.id));

        // Refresh My Watchlist
        renderMyList();

    });
    poster.appendChild(favoriteBtn);

        // Create movie information
        const cardInfo = document.createElement("div");
        cardInfo.className = "card-info";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const category = document.createElement("p");
        category.textContent = movie.category;

        cardInfo.appendChild(title);
        cardInfo.appendChild(category);

        // Put everything inside the card
        card.appendChild(poster);
        card.appendChild(cardInfo);

        // Open modal when clicking a card
        // Open movie details page when clicking a card
        card.addEventListener("click", function() {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        container.appendChild(card);

    });

}

// =====================================
// CLOSE POPUP
// =====================================

function closeModal() {

    document.getElementById("movieModal").style.display = "none";

}


// Close popup when clicking outside

document.getElementById("movieModal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {
            closeModal();
        }

    }
);
// ==============================
// FAVORITE MOVIE SYSTEM
// ==============================

function getFavoriteMovies() {

    return JSON.parse(
        localStorage.getItem("trioflexFavorites")
    ) || [];

}


// Check if movie is favorited
function isFavorite(movieId) {

    return getFavoriteMovies().some(
        id => String(id) === String(movieId)
    );

}


// Add or remove favorite
function toggleFavorite(movieId) {

    let favorites = getFavoriteMovies();

    if (isFavorite(movieId)) {

        favorites = favorites.filter(
            id => String(id) !== String(movieId)
        );

    } else {

        favorites.push(movieId);

    }

    localStorage.setItem(
        "trioflexFavorites",
        JSON.stringify(favorites)
    );

}

// =====================================
// FEATURED MOVIE (HERO)
// =====================================

function showFeaturedInfo() {

    if (movieData && movieData.featured) {

        openModal(movieData.featured);

    }

}

// =====================================
// OPEN MOVIE INFO POPUP
// =====================================

function openModal(movie) {

    document.getElementById("modalImage").src =
        movie.image;

    document.getElementById("modalTitle").textContent =
        movie.title;

    document.getElementById("modalCategory").textContent =
        movie.category;

    document.getElementById("modalDescription").textContent =
        movie.description;

    document.getElementById("movieModal").style.display =
        "flex";

}

// =====================================
// WATCH BUTTON
// =====================================

function showFeaturedInfo() {

    if (!movieData || !movieData.featured) {
        return;
    }

    // Find Hidden Love in all movie sections
    const featuredMovie = allMovies.find(movie =>
        movie.id === movieData.featured.id
    );

    if (featuredMovie) {

        openModal(featuredMovie);

    } else {

        // Use featured information if not found in movie lists
        openModal(movieData.featured);

    }

}


// =====================================
// WATCH FEATURED MOVIE TRAILER
// =====================================

// =====================================
// FEATURED MOVIE (HERO)
// =====================================

function showFeaturedInfo() {

    if (!movieData || !movieData.featured) {
        return;
    }

    // Find Hidden Love in all movie sections
    const featuredMovie = allMovies.find(movie =>
        movie.id === movieData.featured.id
    );

    if (featuredMovie) {

        openModal(featuredMovie);

    } else {

        // Use featured information if not found in movie lists
        openModal(movieData.featured);

    }

}


// =====================================
// WATCH FEATURED TRAILER
// =====================================

function watchFeatured() {

    if (!movieData || !movieData.featured) {
        return;
    }

    const trailer = movieData.featured.trailer;

    if (trailer) {

        window.open(
            trailer,
            "_blank",
            "noopener,noreferrer"
        );

    } else {

        alert("Trailer is not available.");

    }

}

// =====================================
// FILTER MOVIES BY GENRE
// =====================================

const genreButtons = document.querySelectorAll(".genre-card");

genreButtons.forEach(button => {

    button.addEventListener("click", function() {

        const selectedGenre = this.dataset.genre.toLowerCase();

        // Update active button
        genreButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        // Clear search
        searchInput.value = "";

        const sections = document.querySelectorAll(".movie-section");

        const trendingSection = document.getElementById("popular");
        const trendingContainer = document.getElementById("trendingMovies");

        // Show all movies
        if (selectedGenre === "all") {

         // Show every movie section, including My Watchlist
        sections.forEach(section => {
             section.style.display = "";

             const heading = section.querySelector("h2");
             
             if (heading && sectionHeadings[section.id]) {
            
                heading.textContent = sectionHeadings[section.id];
             }

            });

            // Restore original movie sections
            movieData.sections.forEach(section => {

                const container = document.getElementById(section.id);

                    if(container){
                        renderMovies(container, section.movies);
                    }
            });
            // Restore My Watchlist
            renderMyList();
            return;
        }

        // Hide other sections
        sections.forEach(section => {
            section.style.display = "none";
        });

        // Show filtered results
        trendingSection.style.display = "block";

        trendingSection.querySelector("h2").textContent =
            this.textContent.trim() + " Movies";

        // Find matching movies
        const filteredMovies = allMovies.filter(movie => {

            return movie.genre.some(genre =>
                genre.toLowerCase() === selectedGenre
            );

        });

        // Render results
        if (filteredMovies.length > 0) {

            renderMovies(trendingContainer, filteredMovies);

        } else {

            trendingContainer.innerHTML =
                "<p style='color:#888; padding:20px;'>" +
                "No movies found in this genre." +
                "</p>";

        }

    });

});

// ==============================
// DISPLAY MY WATCHLIST
// ==============================

function renderMyList() {

    const myListContainer = document.getElementById("myListContainer");

    if (!myListContainer) return;

    // Get favorite movie IDs from localStorage
    const favorites = JSON.parse(
        localStorage.getItem("trioflexFavorites")
    ) || [];

    // Find movies that match the saved IDs
    const myMovies = allMovies.filter(movie =>
        favorites.some(id => String(id) === String(movie.id))
    );

    // Show message if watchlist is empty
    if (myMovies.length === 0) {

        myListContainer.innerHTML = "<p></p>";

        return;
    }

    // Display favorite movies
    renderMovies(myListContainer, myMovies);
}
// =====================================
// SEARCH MOVIES
// =====================================

const searchInput = document.getElementById("searchInput");

const sectionHeadings = {
    popular: "Trending Now",
    movies: "Popular Movies",
    dramas: "Popular Dramas",
    anime: "Popular Anime",
    mylist: "My Watchlist"
};

searchInput.addEventListener("input", function() {

    const keyword = this.value.toLowerCase().trim();

    const sections = document.querySelectorAll(".movie-section");

    const trendingSection = document.getElementById("popular");

    const trendingContainer = document.getElementById("trendingMovies");

    // If search is empty, restore original sections
    if (keyword === "") {

        sections.forEach(section => {

            section.style.display = "";

            const heading = section.querySelector("h2");

            heading.textContent = sectionHeadings[section.id];

        });

        movieData.sections.forEach(section => {

            const container = document.getElementById(section.id);

            renderMovies(container, section.movies);

        });

        return;

    }

    // Hide all movie sections
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Show search results in Trending section
    trendingSection.style.display = "block";

    trendingSection.querySelector("h2").textContent =
        "🔍 Search Results";

    // Find matching movies
    const results = allMovies.filter(movie => {

        return (
            movie.title.toLowerCase().includes(keyword) ||
            movie.category.toLowerCase().includes(keyword) ||
            movie.genre.some(genre =>
                genre.toLowerCase().includes(keyword)
            )
        );

    });

    // Display matching results
    if (results.length > 0) {

        renderMovies(trendingContainer, results);

    } else {

        trendingContainer.innerHTML =
            "<p style='color:#888; padding:20px;'>" +
            "No movies found. Try again." +
            "</p>";

    }

});


// =====================================
// NAVBAR SCROLL EFFECT
// =====================================

const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleNavbarScroll);

handleNavbarScroll();


// =====================================
// START WEBSITE
// =====================================

loadMovies();
