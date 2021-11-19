import {senators} from "../data/senators.js"
import {representatives} from "../data/representatives.js"
import {removeChildren} from "../star_wars_pages/utils/index.js" 

//We select what we want to attach this stuff to
//do I need to the little . before the class? Yes. That's what was breaking my code beforeil
const memberDiv = document.querySelector('.membersDiv')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')
const buttonsDiv = document.querySelector('.buttons_div')
const modal = document.querySelector('.modal')
const closeButton = document.querySelector(".modal-close")
const modalBackground = document.querySelector('.modal-background')
const modalMessage = document.querySelector(`.modal-message`)
const senatorsButton = document.querySelector('.senators_button')
const repsButton = document.querySelector('.representatives_button')
const republicansButton = document.querySelector('.republicans_button')
const democratsButton = document.querySelector('.democrats_button')
const footer = document.querySelector('footer')
const members = [...senators, ...representatives] //Modern way to combine arrays like a genus! lol 

//populate the screen
populateMembersDiv(simplifiedMembers())

//deactivates the modal
closeButton.addEventListener('click', () => modal.classList.toggle('is-active'))
modalBackground.addEventListener('click', () => modal.classList.toggle('is-active'))

//We simplify the data
function simplifiedMembers(chamberFilter) {
    //this stuff here will do the simplified members on everything unless we pass it a chamber, 
    //then it will show the one or the other
    const filteredArray =  members.filter((member) => chamberFilter ? member.short_title === chamberFilter : member,)
    return filteredArray.map(senator =>{
        let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender, 
            seniority: +senator.seniority,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
        }
    })
}

//We assemble the pieces of our figures using our simple data
function populateMembersDiv(simplifiedMembers) {
    removeChildren(memberDiv)
    simplifiedMembers.forEach(senator =>{
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        memberDiv.appendChild(senFigure)
    })
    
}

//Got a few fun/useful values
//const filterSenators = (prop, value) => simplifiedMembers().filter(senator => senator[prop] === value)
const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
    if (senator.loyaltyPct === 100){
        acc.push(senator)
    }
    return acc
}, [])

const cowardList = document.createElement('ol')
const spineless = mostLoyal.map(coward => {
    let listItem = document.createElement('li')
    listItem.textContent = coward.name
    cowardList.appendChild(listItem)
})

seniorityHeading.textContent = `The most senior member of congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.`

const oldPersonButton = document.createElement('button')
oldPersonButton.textContent = "Most Senior Member"
oldPersonButton.addEventListener('click', () =>{
    modal.classList.toggle('is-active')
    modalMessage.textContent = `The oldest fart kicking around in congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.`
})
buttonsDiv.appendChild(oldPersonButton)

const cowardButton = document.createElement('button')
cowardButton.textContent = 'Most Loyal Members'
cowardButton.addEventListener('click', () => {
    modal.classList.toggle('is-active')
    modalMessage.textContent = `The most spinless members of congress who vote with their party 100% of the time are: `
    modalMessage.appendChild(cowardList)
})
buttonsDiv.appendChild(cowardButton)