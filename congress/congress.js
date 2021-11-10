import {senators} from "../data/senators.js"
//We select what we want to attach this stuff to
const senatorDiv = document.querySelector('.senators')

//We simplify the data
function simplifiedSenators(senatorArray){
    return senatorArray.map(senator =>{
        let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
        }
    })
}

//We assemble the pieces of our figures using our simple data
function populateSenatorDiv(simplifiedSenators) {
    simplifiedSenators.forEach(senator =>{
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
    
}

//And then we run the javaScript. 
//senators is the huge array of data we're working with, then we simplify it and run it in our assembler function
//(our html page has the script at the bottom)
populateSenatorDiv(simplifiedSenators(senators))