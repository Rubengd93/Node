
// Añadir un Event Listener al Formulario:

// Se selecciona el formulario con el ID search-form y se le añade un “event listener” 
// que escucha el evento submit. Cuando se envía el formulario, se ejecuta la función anónima que:

// Previene el comportamiento por defecto del formulario con e.preventDefault(), que es recargar la página.
// Obtiene el valor ingresado en el campo de texto con ID pokemon-name, lo convierte a minúsculas y 
// lo almacena en la variable pokemonName.
// Llama a la función obtenerPokemon pasándole el nombre del Pokémon.


document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    obtenerPokemon(pokemonName);
  });
  

//   Función Asíncrona para Obtener Datos del Pokémon:

// Esta función asíncrona obtiene datos de la API de Pokémon usando fetch:

// await fetch(...) espera a que la petición HTTP se complete y almacena la respuesta en response.
// await response.json() convierte la respuesta a formato JSON y la almacena en data.
// Si la petición es exitosa, llama a mostrarPokemon con los datos obtenidos.
// Si hay un error (por ejemplo, si el Pokémon no existe), se captura en el bloque 
// catch y se muestra en la consola.

  async function obtenerPokemon(pokemonName) {
    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      let data = await response.json();
      mostrarPokemon(data);
    } catch (error) {
      console.error('Error al obtener datos del Pokémon:', error);
    }
  }

//   Función para Mostrar Datos del Pokémon:

// La función mostrarPokemon toma el objeto pokemon y actualiza el HTML del elemento 
// con ID pokemon-display para mostrar:

// El nombre del Pokémon en un encabezado <h2>.
// Una imagen del Pokémon usando la URL de la propiedad sprites.front_default.
// Una tabla con las habilidades del Pokémon, donde cada habilidad se agrega como una fila en la tabla.
// El método map se usa para crear un array de strings HTML para cada habilidad, y join('') une todos estos 
// strings en un solo string HTML que se inserta en el innerHTML del div.
  
  function mostrarPokemon(pokemon) {
    let displayDiv = document.getElementById('pokemon-display');
    displayDiv.innerHTML = `
    <div class="card">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <table>
        <tr>
          <th>Habilidad</th>
        </tr>
        ${pokemon.abilities.map(ability => `<tr><td>${ability.ability.name}</td></tr>`).join('')}
      </table>
    </div>  
    `;
  }