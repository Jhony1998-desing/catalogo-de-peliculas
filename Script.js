const apiKey = "8e2e4225a3f14bc40cdd9c2577df7a70"
const apiUrl = 'https://api.themoviedb.org/3';
const movieList = document.getElementById('movies');
const movieDetails = document.getElementById('movie-details');
const detailsContainer = document.getElementById('details');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const favoritesList = document.getElementById('favorites-list');
const addToFavoritesButton = document.getElementById('add-to-favorites');
let selectedMovieId = null;
let favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch and display popular movies
async function fetchPopularMovies() {
    try {
       const baseUrl = apiUrl + "/movie/popular?api_key=" + apiKey
       const response = await fetch(baseUrl)
       const data = await response.json()
       displayMovies(data.results)
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

// Display movies
function displayMovies(movies) {
    movieList.innerHTML = ''; // Limpia la lista de películas
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <span>${movie.title}</span>
        `;
        li.onclick = () => showMovieDetails(movie.id); // Muestra detalles al hacer clic en la película
        movieList.appendChild(li);
    });
}

// Show movie details
async function showMovieDetails(movieId) {
    try {
const baseUrl = apiUrl + "/movie/" + movieId + "?api_key=" + apiKey + "&language=es-ES"
const response = await fetch(baseUrl)
const data = await response.json()
selectedMovieId = movieId
detailsContainer.innerHTML = `
        <h3>  ${data.title} </h3>
        <img src = "https://image.tmdb.org/t/p/w500${data.poster_path}">
        <ul>
       <li> <p> ${data.genres.map(genero => genero.name)} </p> </li>
        <li> <p> ${data.spoken_languages.map(lenguaje => lenguaje.name)} </p> </li>
           </ul>
        <p> ${data.overview}</p> 
     
`   
movieDetails.classList.remove("hidden")
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Search movies
searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    if (query) {
        try {
            const baseUrl = apiUrl + "/search/movie?api_key=" + apiKey + "&query=" + query
            const response = await fetch(baseUrl)
            const data = await response.json()
            displayMovies(data.results)
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }
});

// Add movie to favorites
addToFavoritesButton.addEventListener('click', () => {
    if (selectedMovieId) {
        const favoriteMovie = {
            id: selectedMovieId,
            title: document.querySelector('#details h3').textContent
        };
        if (!favoriteMovies.some(movie => movie.id === selectedMovieId)) {
            favoriteMovies.push(favoriteMovie);
            localStorage.setItem('favorites', JSON.stringify(favoriteMovies)); // Guarda en localStorage
            displayFavorites(); // Muestra la lista actualizada de favoritos
        }
    }
});

// Display favorite movies
function displayFavorites() {
    favoritesList.innerHTML = ''; // Limpia la lista de favoritos
    favoriteMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        favoritesList.appendChild(li);
    });
}

// Initial fetch of popular movies and display favorites
fetchPopularMovies(); // Obtiene y muestra las películas populares
displayFavorites(); // Muestra las películas favoritas guardadas