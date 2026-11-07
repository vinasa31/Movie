
// MOVIE DATA

const trending = [
    {
        title: "The Last Journey",
        category: "Adventure • 2026",
        rating: "9.2",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
        description: "An unforgettable adventure into a mysterious world."
    },
    {
        title: "Dark Mystery",
        category: "Thriller • 2026",
        rating: "8.9",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
        description: "A detective discovers a secret hidden for years."
    },
    {
        title: "Love Forever",
        category: "Romance • 2026",
        rating: "9.5",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500",
        description: "Two people meet and discover the meaning of love."
    },
    {
        title: "The Lost City",
        category: "Fantasy • 2026",
        rating: "8.7",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=500",
        description: "A journey to find a forgotten ancient city."
    },
    {
        title: "Beyond Space",
        category: "Sci-Fi • 2026",
        rating: "9.0",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500",
        description: "A team explores the unknown universe."
    }
];

const movies = [
    {
        title: "The Secret Island",
        category: "Adventure • Movie",
        rating: "8.8",
        image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500",
        description: "An exciting adventure on a mysterious island."
    },
    {
        title: "Midnight City",
        category: "Action • Movie",
        rating: "9.1",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500",
        description: "A city hides secrets after midnight."
    },
    {
        title: "Summer Memories",
        category: "Romance • Movie",
        rating: "8.6",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500",
        description: "A beautiful story about summer and friendship."
    },
    {
        title: "The Mountain",
        category: "Drama • Movie",
        rating: "9.3",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
        description: "A journey of courage and determination."
    },
    {
        title: "Lost in Dreams",
        category: "Fantasy • Movie",
        rating: "8.9",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500",
        description: "A fantasy world beyond imagination."
    }
];

const dramas = [
    {
        title: "Hidden Love",
        category: "Romance • Chinese Drama",
        rating: "9.5",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
        description: "A sweet love story between two young people."
    },
    {
        title: "Our Secret",
        category: "Romance • Chinese Drama",
        rating: "9.2",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
        description: "A secret friendship slowly becomes love."
    },
    {
        title: "Night Detective",
        category: "Mystery • Korean Drama",
        rating: "8.9",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
        description: "A detective solves mysterious crimes."
    },
    {
        title: "Forever Young",
        category: "Youth • Korean Drama",
        rating: "9.0",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
        description: "A story about friendship, dreams and growing up."
    },
    {
        title: "My Beautiful Life",
        category: "Romance • Thai Drama",
        rating: "8.8",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500",
        description: "A young woman discovers her own happiness."
    }
];

const anime = [
    {
        title: "Magic World",
        category: "Fantasy • Anime",
        rating: "9.4",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
        description: "A young hero discovers magical powers."
    },
    {
        title: "Cyber Future",
        category: "Sci-Fi • Anime",
        rating: "9.1",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500",
        description: "A futuristic world controlled by technology."
    },
    {
        title: "Blue Sky",
        category: "Adventure • Anime",
        rating: "8.9",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500",
        description: "Friends begin a journey across the world."
    },
    {
        title: "Spirit Forest",
        category: "Fantasy • Anime",
        rating: "9.3",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500",
        description: "A magical forest holds an ancient secret."
    },
    {
        title: "Star Journey",
        category: "Adventure • Anime",
        rating: "9.0",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500",
        description: "A journey through the stars begins."
    }
];


// DISPLAY MOVIE CARDS

function displayMovies(movieArray, containerId) {

    const container = document.getElementById(containerId);

    container.innerHTML = "";

    movieArray.forEach(function(movie) {

        container.innerHTML += `
            <div class="movie-card"
                 onclick="openModal('${movie.title}', '${movie.category}', '${movie.description}', '${movie.image}')">

                <img src="${movie.image}" alt="${movie.title}">

                <h3>${movie.title}</h3>

                <p>⭐ ${movie.rating} | ${movie.category}</p>

            </div>
        `;

    });

}


// DISPLAY ALL SECTIONS

displayMovies(trending, "trendingMovies");
displayMovies(movies, "movieList");
displayMovies(dramas, "dramaList");
displayMovies(anime, "animeList");


// SEARCH MOVIES

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const keyword = searchInput.value.toLowerCase();

    const allMovies = [
        ...trending,
        ...movies,
        ...dramas,
        ...anime
    ];

    const results = allMovies.filter(function(movie) {
        return movie.title.toLowerCase().includes(keyword);
    });

    // Hide normal sections while searching
    document.querySelectorAll(".movie-section").forEach(function(section) {
        section.style.display = "none";
    });

    // Show search results in the trending section
    const trendingSection = document.getElementById("popular");

    trendingSection.style.display = "block";

    trendingSection.querySelector("h2").textContent =
        keyword ? "Search Results" : "🔥 Trending Now";

    displayMovies(
        keyword ? results : trending,
        "trendingMovies"
    );

    // Restore all sections when search is empty
    if (keyword === "") {

        document.querySelectorAll(".movie-section").forEach(function(section) {
            section.style.display = "block";
        });

    }

});


// OPEN MOVIE POPUP

function openModal(title, category, description, image) {

    document.getElementById("modalTitle").textContent = title;

    document.getElementById("modalCategory").textContent = category;

    document.getElementById("modalDescription").textContent = description;

    document.getElementById("modalImage").src = image;

    document.getElementById("movieModal").style.display = "flex";

}


// CLOSE POPUP

function closeModal() {

    document.getElementById("movieModal").style.display = "none";

}


// FEATURED MOVIE

function showFeaturedInfo() {

    openModal(
        "THE WORLD BEYOND US",
        "Featured Series • 2026",
        "A mysterious journey begins when two strangers discover a secret that changes their lives forever.",
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200"
    );

}


// WATCH BUTTON

function watchFeatured() {

    alert("Welcome to VIBEPLAY! Video player coming soon.");

}


// CLOSE POPUP WHEN CLICKING OUTSIDE

document.getElementById("movieModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeModal();
    }

});


// NAVBAR SCROLL EFFECT

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
