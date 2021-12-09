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





function loadPokemon(offset = 0, limit = 5) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data)
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData)
      )
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

    let newPokemon = new Pokemon (pokeName, pokeHeight, pokeWeight, getAbilitiesArray(pokeAbilities))
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
    let startPoint = prompt('Which Pokémon ID do you want to start with?')
    let howMany = prompt('How many more Pokémon do you want to see? ')
    loadPokemon(startPoint, howMany)
})


/*
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
*/


function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div")
  pokeScene.className = "scene"
  const pokeCard = document.createElement("div")
  pokeCard.className = "card"
  pokeCard.addEventListener("click", () => {
    // sound('card_flip.mp3')
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
  pokeBack.appendChild(label)
  pokeBack.appendChild(abilityList)
  return pokeBack
}




class Pokemon {
    constructor(name, height, weight, abilities) {
        this.name = name,
        this.height = height,
        this.weight = weight,
        this.abilities = abilities
        this.id = 9001
    }
}

function typesBackground(pokemon, card){
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  if (!pokeType2) {
    card.style.setProperty('background', getPoketypeColor(pokeType1))
  } else {
    card.style.setProperty('background', `linear-gradient(${pokeType1}, ${pokeType2})`), 
  }//40 min in the video 
}

function getPoketypeColor(pokeType){
  let color 
  switch (pokeType) {
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Fighting': 
    color = "#C45D4C"
    break
    case 'Flying': 
    color = "#90AAD7"
    break
    case 'Poison': 
    color = "#B369AF"
    break
    case 'Ground': 
    color = "#CEB250"
    break
    case 'Rock': 
    color = "#BAA85E"
    break
    /*
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    case 'Normal': 
    color = "#ACAD99"
    break
    */
   default:
     color = 'purple'
  }
  return color
}