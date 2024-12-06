// https://www.omdbapi.com/?i=tt3896198&apikey=cd933872&s=guardians

//DOM Elements

const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-btn");
const movieEl = document.querySelector(".movies");

//Event Listener for Search Button

searchButton.addEventListener("click", async () => {
  const query = searchBar.value.trim(); // Get user input and remove extra spaces
  if (query) {
    await searchMovies(query); // Call search function with user query
  } else {
    alert("Please enter a movie name to search!"); // Validation for empty input
  }
});

//Function to Search Movies

async function searchMovies(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=cd933872&s=${query}`
  );
  const data = await response.json();

  if (data.Response === "True") {
    renderMovies(data.Search); //Render movie results
  } else {
    movieEl.innerHTML = `<p>No results found for "${query}".</p>`;
  }
}

//Function to generate the html

function generateMovieHTML(movie) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? `<img class="movie__img" src="${movie.Poster}" alt="${movie.Title}" />`
      : `<div class="movie__placeholder">No Image</div>`;

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
