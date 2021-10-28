import { people } from "../data/people.js";

const mainContent = document.querySelector("#main");

populateDOM(people);

// IDK what happend to this line of code --->const mainBody = document.querySelector("body")
const header = document.createElement("header");
const maleButton = document.createElement("button");
maleButton.textContent = "Male Characters";
maleButton.addEventListener("click", () => populateDOM(maleCharacters));

const femaleButton = document.createElement("button");
femaleButton.textContent = "Female Characters";
header.appendChild(maleButton);
header.appendChild(femaleButton);
femaleButton.addEventListener("click", () => populateDOM(femaleCharacters));

document.body.insertBefore(header, mainContent);

const maleCharacters = people.filter((person) => person.gender === "male");
const femaleCharacters = people.filter((person) => person.gender === "female");
const otherCharacters = people.filter((person) => {
  if (person.gender !== "male" && person.gender !== "female") {
    return person;
  }
});

function populateDOM(characters) {
  //first clear the page, then populate
  while (mainContent.firstChild) {
    //The list is LIVE so it will reindex each call
    mainContent.removeChild(mainContent.firstChild);
  }
  characters.forEach((person, index) => {
    const charFigure = document.createElement("figure");
    const charImg = document.createElement("img");
    const charNum = getLastNumber(person.url);
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

    const charCaption = document.createElement("figcaption");
    charCaption.textContent = person.name;

    charFigure.appendChild(charImg);
    charFigure.appendChild(charCaption);
    mainContent.appendChild(charFigure);
  });
}

function getLastNumber(url) {
  let end = url.lastIndexOf("/");
  let start = end - 2;
  if (url.charAt(start) === "/") {
    start++;
  }
  return url.slice(start, end);
}
