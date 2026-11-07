
// ==============================
// OPEN MOVIE POPUP
// ==============================

function openModal(card) {

    const title       = card.dataset.title;
    const category    = card.dataset.category;
    const description = card.dataset.description;
    const image       = card.dataset.image;

    document.getElementById("modalTitle").textContent       = title;
    document.getElementById("modalCategory").textContent    = category;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalImage").src               = image;

    document.getElementById("movieModal").style.display = "flex";

}


// ==============================
// CLOSE POPUP
// ==============================

function closeModal() {

    document.getElementById("movieModal").style.display = "none";

}


// Close popup when clicking outside the modal box
document.getElementById("movieModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeModal();
    }

});


// ==============================
// FEATURED MOVIE (HERO)
// ==============================

function showFeaturedInfo() {

    const fakeCard = {
        dataset: {
            title:       "Hidden Love",
            category:    "Romance • 2023",
            description: "Since high school, Sang Zhi has had a crush on Duan Jiaxu. When fate brings them together again, they find a chance to embark on a sweet relationship.",
            image:       "../IMG/hiddenlove.jpg"
        }
    };

    openModal(fakeCard);

}


// ==============================
// WATCH BUTTON
// ==============================

function watchFeatured() {

    alert("Welcome to VIBEPLAY! Video player coming soon.");

}


// ==============================
// SEARCH MOVIES
// ==============================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const keyword = this.value.toLowerCase().trim();

    // Collect all cards on the page
    const allCards = document.querySelectorAll(".movie-card");

    if (keyword === "") {

        // Restore all sections and show all cards
        document.querySelectorAll(".movie-section").forEach(function(section) {
            section.style.display = "";
        });

        allCards.forEach(function(card) {
            card.style.display = "";
        });

        return;

    }

    // Hide all sections
    document.querySelectorAll(".movie-section").forEach(function(section) {
        section.style.display = "none";
    });

    // Show trending section as search results container
    const trendingSection = document.getElementById("popular");
    trendingSection.style.display = "block";
    trendingSection.querySelector("h2").textContent = "🔍 Search Results";

    // Move matching cards into the trending container
    const trendingContainer = document.getElementById("trendingMovies");
    trendingContainer.innerHTML = "";

    let found = 0;

    allCards.forEach(function(card) {

        const title    = card.dataset.title.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        if (title.includes(keyword) || category.includes(keyword)) {
            trendingContainer.appendChild(card.cloneNode(true));
            found++;
        }

    });

    if (found === 0) {
        trendingContainer.innerHTML = "<p style='color:#888; padding:20px;'>No results found for \"" + keyword + "\"</p>";
    }

});

// Restore section heading when search is cleared
searchInput.addEventListener("blur", function() {

    if (this.value.trim() === "") {

        const trendingSection = document.getElementById("popular");
        trendingSection.querySelector("h2").textContent = "🔥 Trending Now";

    }

});


// ==============================
// NAVBAR SCROLL EFFECT
// ==============================

const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();
