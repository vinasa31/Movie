
// ==============================
// GET MOVIE ID FROM URL
// ==============================

const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));


// ==============================
// LOAD MOVIE DATA
// ==============================

async function loadMovieDetails() {

    try {

        const response = await fetch("DATA/movies.json");

        if (!response.ok) {
            throw new Error("Cannot load movie data");
        }

        const data = await response.json();

        // Get all movies from every section
        const movies = data.sections.flatMap(
            section => section.movies || []
        );

        // Find selected movie
        const movie = movies.find(
            item => item.id === movieId
        );
        if (!movie) {
            document.querySelector("main").innerHTML =
                "<h2>Movie not found!</h2>";
            return;
        }
        // ==============================
        // DISPLAY MOVIE INFORMATION
        // ==============================
        document.getElementById("movieTitle").textContent = movie.title || "Unknown Movie";

        document.getElementById("moviePoster").src = movie.poster || movie.image;

         /* ==============================
           SMALL MOVIE POSTER
        ============================== */

        const movieCover = document.getElementById("movieCover");

        if (movieCover) {
            movieCover.src = movie.poster || movie.image || "";
        }


        document.getElementById("movieYear")
            .textContent = movie.year || "Year unavailable";

        document.getElementById("movieGenre")
            .textContent = Array.isArray(movie.genre)
                ? movie.genre.join(" • ")
                : "Genre unavailable";

        document.getElementById("movieAgeRating")
            .textContent = movie.age || "Not rated";

        document.getElementById("movieRating")
            .textContent = movie.rating != null
                ? "⭐ " + movie.rating + "/10"
                : "Rating unavailable";

        document.getElementById("moviePlot")
            .textContent = movie.description || "No description available.";

        const episodeElement = document.getElementById("movieEpisodes");

        if (movie.episode) {

            episodeElement.textContent = movie.episode;

            episodeElement.style.display = "inline-flex";

        } else {

        episodeElement.style.display = "none";

        }
        // ==============================
        // DISPLAY CAST MEMBERS
        // ==============================
        const castContainer = document.getElementById("movieCast");

        castContainer.innerHTML = "";

        if (Array.isArray(movie.cast) && movie.cast.length > 0) {

            movie.cast.forEach(actor => {
            const actorElement = document.createElement("span");

            actorElement.textContent = actor;

            castContainer.appendChild(actorElement);
        });

        } else {
            castContainer.textContent = "Cast information unavailable.";
        }
        // ==============================
        // DISPLAY TRAILER
        // ==============================
       const trailer = document.getElementById("movieTrailer");
        const trailerSection = document.querySelector(".trailer-section");

        if (movie.trailer && movie.trailer.trim() !== "") {
            trailer.href = movie.trailer;
            trailerSection.style.display = "block";
        } else {
        trailerSection.style.display = "none";
        }

    }
    catch (error) {

        console.error("Error:", error);

        document.querySelector("main").textContent =
            "Unable to load movie details. Please try again.";

    }

}

loadMovieDetails();
