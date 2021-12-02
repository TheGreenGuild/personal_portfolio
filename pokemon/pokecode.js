//This waits until it finishes fetching info from the url and console logs it.
//it shows us the error if we get an error though
import {removeChildren } from '../star_wars_pages/utils/index.js'

async function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json())
  } catch (error) {
    console.error(error)
  }
}

function loadPokemon(offset = 0, limit = 25) {
    removeChildren(pokeGrid)
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data)
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      )
    }
  })
}

const pokeGrid = document.querySelector(".pokeGrid")
const loadButton = document.querySelector(".loadPokemon")
loadButton.addEventListener("click", () => loadPokemon(800, 50))
const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => )

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div")
  pokeScene.className = "scene"
  const pokeCard = document.createElement("div")
  pokeCard.className = "card"
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  )
  const front = populateCardFront(singlePokemon)
  const back = populateCardBack(singlePokemon)

  pokeCard.appendChild(front)
  pokeCard.appendChild(back)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure")
  pokeFront.className = "card_face front"
  const pokeImg = document.createElement("img")
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  const pokeCaption = document.createElement("figcaption")
  pokeCaption.textContent = pokemon.name
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)
  return pokeFront
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div")
  pokeBack.className = "card_face back"
  const label = document.createElement("h4")
  label.textContent = "Abilities:"
  const abilityList = document.createElement("ul")
  pokemon.abilities.forEach((ability) => {
    console.log(ability)
    let abilityItem = document.createElement("li")
    abilityItem.textContent = ability.ability.name
    abilityList.appendChild(abilityItem)
  })
  pokeBack.appendChild(label)
  pokeBack.appendChild(abilityList)
  return pokeBack
}

class Pokemon {
    constructor(name, height, weight, abilities) {
        this.name = name,
        this.height = height,
        this.weight = weight,
        this.abilities = abilities, 
    }
}

let newPokemon = new Pokemon ('Thoremon', 234, 3785)
console.log(newPokemon)

