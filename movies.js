// https://www.omdbapi.com/?i=tt3896198&apikey=cd933872&s=guardians

async function main () {
    const movies = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=cd933872&s=guardians");
    const moviesData = await movies.json();
    
    console.log(
    moviesData.Search.map( (movies) => `<div class="movie">
        <figure class="movie__img--wrapper">
            <img class="movie__img" src="assets/avengers.jpg" alt="" />
        </figure>
        <div class="movie__title">
            Captain America: The first Avenger
        </div>
        <div class="movie_year">2011</div>
    </div>`));
    
}

main();