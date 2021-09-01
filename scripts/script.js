
const renderPokemonCard = res => { // parte 3 
  const cardElment = document.createElement('div'); // crear la div 
  const cardFragmentHtml = '<div class="card"> <img class="card-img-top" src="" alt=""><div class="card-body"><p class="card-text"></p></div></div>'
  cardElment.innerHTML = cardFragmentHtml;
  console.log(res);
  document.querySelector(".card-container").appendChild(cardElment); // anade el card 
  document.querySelector(".card-text").innerHTML = res.name;  // pone el nombre 
  document.querySelector(".card-img-top").src = res.sprites.back_default;  // pone las fotos de los pokemons 
}

const clearContent = () => {
document.querySelector(".card-container").innerHTML = "";
document.querySelector(".alert-container").innerHTML = "";
document.querySelector(".list-group").innerHTML = "";
}

const renderAlert = (alertText) => {
  const alertElement = document.createElement('div')
  const alertFragmentHtml = '<div class="alert alert-danger" role="alert"></div>'
  alertElement.innerHTML = alertFragmentHtml;
  document.querySelector(".alert-container").appendChild(alertElement)
  document.querySelector(".alert").innerHTML = alertText;
   
}

const getSinglePokemon = async (search) => { // parte 2 
  // async mui importante poner // cargar la informacion de search

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${search}`
    const response = await fetch(url)
    const parsedRes = await response.json() // tranformar JSON en objeto
    clearContent() // evita cards de perquisa acumulados 
    renderPokemonCard(parsedRes);
  } catch (error) {    //try catch // poner siempre para saber los errores 
    console.log(error)
    clearContent() // mirar la function 
    renderAlert(`Something went wrong with your search: ${search}`)
  }
}

const renderPokemonList = (res) => {
  res.results.forEach( (pokemon, i) => {
 const listElement = document.createElement('li');
 listElement.classList.add(`pokemon-${i+1}` , "list-group-item");
 document.querySelector(".list-group").appendChild(listElement);
 listElement.innerHTML= `<button class="btn btn-link">${pokemon.name}</button>`
 document.querySelector(`.pokemon-${i+1}`).onclick = () => getSinglePokemon(i+1);
 
   
});
 
}

const getAllPokemon = async () => {  //funcion para cargar todos los pokemons 
try {
  const url = "https://pokeapi.co/api/v2/pokemon/" 
  const response = await fetch(url)
  const parsedRes = await response.json() 
  clearContent(); // mirar la function 
  renderPokemonList(parsedRes)
} catch {
  console.log(error);
  clearContent() // mirar la function 
  renderAlert(`Something went wrong with your request`)  //mirar la funcion 

}
}
window.onload = () => { // el inicio de todo // parte  1 
  document.querySelector('#search-button').addEventListener('click', () => {
    const searchTerm = document.querySelector('.form-control').value
    searchTerm && getSinglePokemon(searchTerm)  // evita error de la busqueda con el campo em blanco 
  }
  
  )
document.querySelector('#fetch-all').addEventListener('click',  //parte 4 
() => {
    getAllPokemon() // mirar la function 
}
)
}

/*import { getAllPokemon, getOnePokemonSprite, getOnePokemon } from "./api.js";

async function createPokemonImage(url) {
  const pokemonImage = document.createElement("img");
  pokemonImage.src = await getOnePokemonSprite(url);
  return pokemonImage;
}

function createPokemonLink(name, url) {
  const pokemonLink = document.createElement("a");
  pokemonLink.href = url;
  pokemonLink.textContent = name;
  return pokemonLink;
}

async function createPokemon(name, url) {
  const newPokemon = document.createElement("div");
  newPokemon.appendChild(await createPokemonImage(url));
  newPokemon.appendChild(document.createElement("br"));
  newPokemon.appendChild(createPokemonLink(name, url));

  return newPokemon;
}



function searchPokemon(event) {
  if (event.code === "Enter") {
    const term=event.target.value;
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
    const root = document.getElementById("root");
    root.innerHTML=''
    createPokemon(term, url).then(
      newPokemon => root.appendChild(newPokemon)
    )
    //getOnePokemon(term)
    //  .then(pokemon => console.log(pokemon))
  }
}

function createSearchField() {
  const searchField = document.createElement("input")
  searchField.type="text"
  searchField.placeholder="Search"
  searchField.addEventListener("keyup", searchPokemon)
  return searchField;
}


async function init() {
  const root = document.getElementById("root");

  document.body.insertBefore(createSearchField(), root)

  const pokemon = await getAllPokemon();

  pokemon.forEach(async ({ name, url }) => {
    root.appendChild(await createPokemon(name, url))
  });
}

init(); */
