/*
  1. W pliku data.js pod zmienna "pokemons" znajduje się tablica zawierająca dane wielu pokemonów, masz do niej dostęp również w tym pliku. 
  Chciałbym, abyś użył jej do wyświetlenia wszystkich pokemonów w naszym Pokedexie. 
  W tym celu dla każdego z nich możesz stworzyć nowy element drzeewa DOM i umieścić w nim informacje o Pokemonie (możesz zawrzeć tam jego nazwę, zdjęcie, a na kontener w którym się znajduje nadać specjalną klasę zależnie od typu)
*/
import { pokemons } from "./data.js";

/**
 * Tworzy etykiety tabeli.
 * @param {HTMLTableElement} table
 */
function addLabels(table) {
  const tableLabels = document.createElement("tr");
  table.appendChild(tableLabels);
  const nameLabel = document.createElement("th");
  nameLabel.appendChild(document.createTextNode("Name"));
  tableLabels.appendChild(nameLabel);
  const imageLabel = document.createElement("th");
  imageLabel.appendChild(document.createTextNode("Image"));
  tableLabels.appendChild(imageLabel);
}

/**
 * Odświeża dane w tabelce.
 * @param {HTMLTableElement} table
 * @param {Array<{types: string[], id: number, name: string, image: string}>} pokemons
 */
function renderPokemons(table, pokemons) {
  // Usuwa html tabelki
  table.innerHTML = '';

  addLabels(table);

  pokemons.forEach(p => {
    const record = document.createElement("tr");
    p.types.forEach(t => {
      record.classList.add(t);
    });

    const img = new Image();
    img.src = p.image;

    // Wiki: https://www.pokemon.com/us/pokedex 
    const nameNode = document.createTextNode(p.name);
    const link = document.createElement("a");
    const apiName = p.name.toLowerCase()
      .replace('♂', '-male').replace('♀', '-female')
      .replace('.', '').replace(' ', '-');
    link.href = `https://www.pokemon.com/us/pokedex/${apiName}`

    const nameCell = document.createElement("td");
    link.appendChild(nameNode);
    nameCell.appendChild(link);

    const imgCell = document.createElement("td");
    imgCell.appendChild(img);

    record.appendChild(nameCell);
    record.appendChild(imgCell);
    table.appendChild(record);
  });
}

/**
 * Z cyklu dlaczego JS nie nadaje się do pracy z danymi
 * @param {Array<{types: string[], id: number, name: string, image: string}>} pokemons
 * @param {string | null} name
 * @param {Array<{[key: string]: boolean}>} types
 * @returns {Array<{types: string[], id: number, name: string, image: string}>} 
 */
function filterPokemons(pokemons, name, types) {
  if(name == null)
    return pokemons;

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase()) &&
    checkTypes(p, types)
  );

  return filtered;
}

/**
 * Sprawdza czy jeden z typów danego pokemonsa jest w aktywnych filtrach.
 * @param {{types: string[], id: number, name: string, image: string}} pokemon
 * @param {Array<{[key: string]: boolean}>} types
 * @returns
 */
function checkTypes(pokemon, types) {
  for(const pokemonType of pokemon.types) {
    for(const type of types) {
      if(type[pokemonType] === true)
        return true;
    }
  }
  return false;
}

/**
 * onSubmit handler.
 * @param {HTMLFormElement} event 
 * @returns 
 */
function submitForm(event) {
  event.preventDefault();

  // spoza danych eventu, ale bezpieczne na zmiany formularza
  const input = document.getElementById('pokemon-name');
  if(!input) return;

  // dane eventu, ale zależne od layoutu formularza
  const types = [];
  for(let i = 0; i < 17; i++) {
    types.push({
      [event.target[i].id]: event.target[i].checked
    });
  }

  // następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
  renderPokemons(pokemonsTable, filterPokemons(pokemons, input.value, types));
}

// tutaj złapiemy sekcję, do której będziemy dodawać pokemony
const pokemonsContainer = document.querySelector(".pokemons");

// tabelka
const pokemonsTable = document.createElement("table");
pokemonsContainer.appendChild(pokemonsTable);
addLabels(pokemonsTable);

// następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
renderPokemons(pokemonsTable, pokemons);

/*
  2. Przeglądanie całej listy pokemonów może okazać się trochę uciążliwe. Fajnie byłoby skorzystać z filtrów, które już znajdują sie w pliku html. 
  Napisz ciało funkcji które pozwoli nam na:
  - filtrowanie po typie
  - filtrowanie po nazwie (wpisany fragment zawiera się w nazwie pokemona)
*/

const form = document.querySelector("form");

form.addEventListener("submit", submitForm);

/*
  3. Pokedex powinien wyglądać trochę lepiej, niż ten tutaj. W folderze znajdziesz plik style.css, w którym możesz ulepszyć wygląd naszego pokedexa
  Liczymy na Twoją kreatywność 😉
*/
