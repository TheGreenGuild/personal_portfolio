import {senators} from "../data/senators.js"
import {representatives} from "../data/representatives.js"
import {removeChildren} from "../star_wars_pages/utils/index.js" 

const members = [...senators, ...representatives] //Modern way to combine arrays like a genus! lol 

//We select what we want to attach this stuff to
const memberDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')


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

//Made the headers say stuff
seniorityHeading.textContent = `The most senior member of congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.`
loyaltyHeading.textContent = `The most spinless members of congress who vote with their party 100% of the time are: `

//append stuff together here 
loyaltyHeading.appendChild(cowardList)

populateMembersDiv(simplifiedMembers())