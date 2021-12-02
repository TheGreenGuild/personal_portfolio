//This waits until it finishes fetching info from the url and console logs it.
//it shows us the error if we get an error though 
async function getAPIData(url) {
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

getAPIData(`https://pokeapi.co/api/v2/pokemon/25`)
.then((data) => {
    console.log(data)
    populatePokeCards(data)
})

const pokeGrid = document.querySelector('.pokeGrid')

function populatePokeCards(singlePokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () =>
        pokeCard.classList.toggle('is-flipped')
    )
    const pokeFront = document.createElement('div')
    pokeFront.className = 'card_face front'
    pokeFront.textContent = 'Front'
    const pokeBack = document.createElement('div')
    pokeBack.className = 'card_face back'
    pokeBack.textContent = 'Back'
    

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

