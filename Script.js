const apiKey = 'TU_CLAVE_API';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieList = document.getElementById('movies');
const movieDetails = document.getElementById('details');
const movieDetailsSection = document.getElementById('movie-details');
const favoritesList = document.getElementById('favorites-list');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    buscarPeliculas(query);
  }
});

async function buscarPeliculas(query) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  mostrarPeliculas(data.results);
}

function mostrarPeliculas(peliculas) {
  movieList.innerHTML = '';
  peliculas.forEach(pelicula => {
    const li = document.createElement('li');
    li.textContent = pelicula.title;
    li.addEventListener('click', () => mostrarDetallesPelicula(pelicula.id));
    movieList.appendChild(li);
  });
}

async function mostrarDetallesPelicula(id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
  const pelicula = await response.json();
  movieDetails.innerHTML = `
    <h3>${pelicula.title}</h3>
    <p>${pelicula.overview}</p>
    <p><strong>Rating:</strong> ${pelicula.vote_average}</p>
  `;
  movieDetailsSection.classList.remove('hidden');
}

document.getElementById('add-to-favorites').addEventListener('click', () => {
  const title = movieDetails.querySelector('h3').textContent;
  const li = document.createElement('li');
  li.textContent = title;
  favoritesList.appendChild(li);
});

// Lista de películas clásicas
const peliculasClasicas = [
    { title: "Casablanca", year: 1942 },
    { title: "Gone with the Wind", year: 1939 },
    { title: "The Godfather", year: 1972 },
    { title: "Citizen Kane", year: 1941 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "The Wizard of Oz", year: 1939 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 }
  ];
  
  // Función para mostrar películas clásicas
  function mostrarPeliculasClasicas() {
    const classicsList = document.getElementById('classics-list');
    classicsList.innerHTML = '';
    peliculasClasicas.forEach(pelicula => {
      const li = document.createElement('li');
      li.textContent = `${pelicula.title} (${pelicula.year})`;
      classicsList.appendChild(li);
    });
  }
  
  // Llamar a la función para mostrar películas clásicas al cargar la página
  document.addEventListener('DOMContentLoaded', mostrarPeliculasClasicas);
  