// https://www.omdbapi.com/?i=tt3896198&apikey=cd933872&s=guardians

//DOM Elements

const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-btn");
const movieEl = document.querySelector(".movies");
const filterDropdown = document.querySelector("#filter");

//Event Listener for Search Button

searchButton.addEventListener("click", async () => {
  const query = searchBar.value.trim(); // Get user input and remove extra spaces
  if (query) {
    await searchMovies(query); // Call search function with user query
  } else {
    alert("Please enter a movie name to search!"); // Validation for empty input
  }
});

// Event Listener for Enter Key Press
searchBar.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    // Check if the pressed key is Enter
    const query = searchBar.value.trim(); // Get user input and remove extra spaces
    if (query) {
      await searchMovies(query); // Call search function with user query
    } else {
      alert("Please enter a movie name to search!"); // Validation for empty input
    }
  }
});

// Event Listener for Sort Dropdown
filterDropdown.addEventListener("change", async () => {
  const query = searchBar.value.trim();
  if (query) {
    await searchMovies(query);
  }
});



// Function to Show Skeleton Loader
function showSkeletonLoader() {
  const skeletonHTML = Array(8)
    .fill("")
    .map(() => {
      return `
        <div class="skeleton__movie">
          <div class="skeleton skeleton__movie--img"></div>
          <div class="skeleton skeleton__movie--title"></div>
          <div class="skeleton skeleton__movie--year"></div>
        </div>
      `;
    })
    .join("");
  movieEl.innerHTML = skeletonHTML;
}

// Function to Search Movies
async function searchMovies(query) {
  showSkeletonLoader(); // Display skeleton loader

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=cd933872&s=${query}`
    );
    const data = await response.json();

    // Delay showing the results for 1.5 seconds (1500ms)
    setTimeout(() => {
      if (data.Response === "True") {
        let sortedMovies = data.Search;

        // Sort movies based on selected filter
        const sortOption = filterDropdown.value;
        if (sortOption === "NEW_TO_OLD") {
          sortedMovies = sortedMovies.sort((a, b) => b.Year - a.Year);
        } else if (sortOption === "OLD_TO_NEW") {
          sortedMovies = sortedMovies.sort((a, b) => a.Year - b.Year);
        }

        renderMovies(sortedMovies); // Render actual movie results
      } else {
        movieEl.innerHTML = `<p>No results found for "${query}".</p>`;
      }
    }, 1500); // Delay duration in milliseconds
  } catch (error) {
    console.error("Error fetching data:", error);
    movieEl.innerHTML = `<p>Something went wrong. Please try again.</p>`;
  }
}


//Function to generate the html

function generateMovieHTML(movie) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? `<img class="movie__img" src="${movie.Poster}" alt="${movie.Title}" />`
      : `<img class="movie__placeholder" src="/assets/no-poster-fallback.png" alt="">`;

  return `<div class="movie">
    <figure class="movie__img--wrapper">
        ${poster}
    </figure>
    <div class="movie__title">
        ${movie.Title}
    </div>
    <div class="movie_year">${movie.Year}</div>
</div>`;
}

//Function to Render Movies

function renderMovies(movies) {
  movieEl.innerHTML = movies.map(generateMovieHTML).join("");
}
