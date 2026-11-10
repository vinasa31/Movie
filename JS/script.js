
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

        // Collect all movies from all sections into 1 array
        allMovies = movieData.sections.flatMap(
            section => section.movies
        );

        // Display movies in their original sections
        movieData.sections.forEach(section => {

            const container = document.getElementById(section.id);

            if (container) {
                renderMovies(container, section.movies);
            }

        });

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


// =====================================
// FEATURED MOVIE (HERO)
// =====================================

function showFeaturedInfo() {

    if (movieData && movieData.featured) {

        openModal(movieData.featured);

    }

}


// =====================================
// WATCH BUTTON
// =====================================

function watchFeatured() {

    alert("Welcome to VIBEPLAY! Video player coming soon.");

}


// =====================================
// SEARCH MOVIES
// =====================================

const searchInput = document.getElementById("searchInput");

const sectionHeadings = {
    popular: "🔥 Trending Now",
    movies: "🎬 Popular Movies",
    dramas: "❤️ Popular Dramas",
    anime: "⚡ Anime Selection"
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
