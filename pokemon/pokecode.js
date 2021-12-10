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

const simplePokemon = getAllSimplePokemon()
//when I try to get the simple pokemon of the all pokemon page,
// I get a different amount every time.

function getAllSimplePokemon() {
  const allPokemon = []
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`).then(
    async (data) => {
      for (const pokemon of data.results) {
        await getAPIData(pokemon.url).then((pokeData) => {
          const mappedPokemon = {
            abilities: pokeData.abilities, 
            height: pokeData.height, 
            id: pokeData.id,
            name: pokeData.name,
            types: pokeData.types, 
            weight:  pokeData.weight,
          }
          allPokemon.push(mappedPokemon)
        })
      }
    },
  )
  return allPokemon
}



function loadPokemon(offset = 0, limit = 5) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data)
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) => {
        populatePokeCard(pokeData)
      })
    }
  })
}




const pokeGrid = document.querySelector(".pokeGrid")
const loadButton = document.querySelector(".loadPokemon")
loadButton.addEventListener("click", () => {
    removeChildren(pokeGrid)
    loadPokemon(0, 25)})
const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => {
    let pokeName = prompt('What is the name of your made up Pokémon?')
    let pokeHeight = prompt('How tall is your Pokémon?')
    let pokeWeight = prompt('How heavy is your Pokémon?')
    let pokeAbilities = prompt('What abilities does your Pokémon have? (Enter as a comma seperated list.)')
    let pokeType = prompt("What type is your Pokémon? (Use lower case and a space between if it's two types)")
    let newPokemon = new Pokemon (
      pokeName, 
      pokeHeight, 
      pokeWeight, 
      getAbilitiesArray(pokeAbilities),
      getTypesArray(pokeType)
      )
    console.log(newPokemon)
    populatePokeCard(newPokemon)
})

function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    console.log(tempArray)
    return tempArray.map((abilityName) => {
        return {
            ability: {
                name: abilityName
            }
        }
    })
}

const morePokemon = document.querySelector('.morePokemon')
morePokemon.addEventListener('click', () => {
  removeChildren(pokeGrid)
    let startPoint = prompt('Which Pokémon ID do you want to start with?')
    let howMany = prompt('How many more Pokémon do you want to see? ')
    loadPokemon(startPoint, howMany)
})

/*
let cardFlipNoise = new Audio('/card_flip.mp3')
cardFlipNoise.src = '/card_flip.mp3'

//idk if the url part is the right syntax 
*/

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div")
  pokeScene.className = "scene"
  const pokeCard = document.createElement("div")
  pokeCard.className = "card"
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped")
  })
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
  if(pokemon.id === 9001){
      pokeImg.src = '../pictures_for_portfolio/pokeball.png'
  }
  else{
      pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }
  const pokeCaption = document.createElement("figcaption")
  pokeCaption.textContent = `${pokemon.id} ${pokemon.name}`
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)

  typesBackground(pokemon, pokeFront)

  return pokeFront
}


function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div")
  pokeBack.className = "card_face back"
  const label = document.createElement("h4")
  label.textContent = "Abilities:"
  const abilityList = document.createElement("ul")
  pokemon.abilities.forEach((ability) => {
    let abilityItem = document.createElement("li")
    abilityItem.textContent = ability.ability.name
    abilityList.appendChild(abilityItem)
  })
  const pokeTypes = document.createElement('ol')
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement('li')
    typeItem.textContent = pokeType.type.name
    pokeTypes.appendChild(typeItem)
  })

  pokeBack.appendChild(label)
  pokeBack.appendChild(abilityList)
  pokeBack.appendChild(pokeTypes)
  return pokeBack
}


function getTypesArray(spacedString) {
  let tempArray = spacedString.split(' ')
  return tempArray.map((typeName) =>{
    return {
      type: {
        name: typeName,
      }
    }
  })
}



class Pokemon {
    constructor(name, height, weight, abilities, type) {
        this.name = name,
        this.height = height,
        this.weight = weight,
        this.abilities = abilities
        this.types = type,
        this.id = 9001
    }
}

function typesBackground(pokemon, card){
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  if (!pokeType2) {
    card.style.setProperty('background', getPoketypeColor(pokeType1))
  } else {
    card.style.setProperty('background', 
    `linear-gradient(${getPoketypeColor(pokeType1)}, ${getPoketypeColor(pokeType2)})`) 
  }
}

function getPoketypeColor(pokeType){
  let color 
  switch (pokeType) {
    case 'normal': 
    color = "#ACAD99"
    break
    case 'fighting': 
    color = "#C45D4C"
    break
    case 'flying': 
    color = "#90AAD7"
    break
    case 'poison': 
    color = "#B369AF"
    break
    case 'ground': 
    color = "#CEB250"
    break
    case 'rock': 
    color = "#BAA85E"
    break
    case 'bug': 
    color = "#ACC23E"
    break
    case 'ghost': 
    color = "#816DB6"
    break
    case 'steel': 
    color = "#9FA9AF"
    break
    case 'fire': 
    color = "#E87A3D"
    break
    case 'water': 
    color = "#639CE4"
    break
    case 'grass': 
    color = "#82C95B"
    break
    case 'electric': 
    color = "#E7C536"
    break
    case 'psychic': 
    color = "#E96C95"
    break
    case 'ice': 
    color = "#81CFD7"
    break
    case 'dragon': 
    color = "#8572C8"
    break
    case 'dark': 
    color = "#79726B"
    break
    case 'fairy': 
    color = "#E8B0EB"
    break
   default:
     color = 'purple'
  }
  return color
}

//filters for a type from the simple data
function getFilteredPokemon(pokeType) {
  return simplePokemon.filter((pokemon) => pokemon.types[0].type.name === pokeType)
}

const filtersBox = document.querySelector('.filters-box')

const normalButton = document.querySelector('.normal-button')
normalButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const normalPokemon = getFilteredPokemon('normal')
  normalPokemon.forEach((item) => populatePokeCard(item))
})

const fightingButton = document.querySelector('.fighting-button')
fightingButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const fightingPokemon = getFilteredPokemon('fighting')
  fightingPokemon.forEach((item) => populatePokeCard(item))
})

const flyingButton = document.querySelector('.flying-button')
flyingButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const flyingPokemon = getFilteredPokemon('flying')
  flyingPokemon.forEach((item) => populatePokeCard(item))
})

const poisonButton = document.querySelector('.poison-button')
poisonButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const poisonPokemon = getFilteredPokemon('poison')
  poisonPokemon.forEach((item) => populatePokeCard(item))
})

const groundButton = document.querySelector('.ground-button')
groundButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const groundPokemon = getFilteredPokemon('ground')
  groundPokemon.forEach((item) => populatePokeCard(item))
})

const rockButton = document.querySelector('.rock-button')
rockButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const rockPokemon = getFilteredPokemon('rock')
  rockPokemon.forEach((item) => populatePokeCard(item))
})

const bugButton = document.querySelector('.bug-button')
bugButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const bugPokemon = getFilteredPokemon('bug')
  bugPokemon.forEach((item) => populatePokeCard(item))
})

const ghostButton = document.querySelector('.ghost-button')
ghostButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const ghostPokemon = getFilteredPokemon('ghost')
  ghostPokemon.forEach((item) => populatePokeCard(item))
})

const steelButton = document.querySelector('.steel-button')
steelButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const steelPokemon = getFilteredPokemon('steel')
  steelPokemon.forEach((item) => populatePokeCard(item))
})

const fireButton = document.querySelector('.fire-button')
fireButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const firePokemon = getFilteredPokemon('fire')
  firePokemon.forEach((item) => populatePokeCard(item))
})

const waterButton = document.querySelector('.water-button')
waterButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const waterPokemon = getFilteredPokemon('water')
  waterPokemon.forEach((item) => populatePokeCard(item))
})

const grassButton = document.querySelector('.grass-button')
grassButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const grassPokemon = getFilteredPokemon('grass')
  grassPokemon.forEach((item) => populatePokeCard(item))
})

const electricButton = document.querySelector('.electric-button')
electricButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const electricPokemon = getFilteredPokemon('electric')
  electricPokemon.forEach((item) => populatePokeCard(item))
})

const psychicButton = document.querySelector('.psychic-button')
psychicButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const psychicPokemon = getFilteredPokemon('psychic')
  psychicPokemon.forEach((item) => populatePokeCard(item))
})

const iceButton = document.querySelector('.ice-button')
iceButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const icePokemon = getFilteredPokemon('ice')
  icePokemon.forEach((item) => populatePokeCard(item))
})

const dragonButton = document.querySelector('.dragon-button')
dragonButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const dragonPokemon = getFilteredPokemon('dragon')
  dragonPokemon.forEach((item) => populatePokeCard(item))
})

const darkButton = document.querySelector('.dark-button')
darkButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const darkPokemon = getFilteredPokemon('dark')
  darkPokemon.forEach((item) => populatePokeCard(item))
})

const fairyButton = document.querySelector('.fairy-button')
fairyButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  const fairyPokemon = getFilteredPokemon('fairy')
  fairyPokemon.forEach((item) => populatePokeCard(item))
})