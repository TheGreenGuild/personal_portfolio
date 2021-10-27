/*Variables - containers that store values. 
This is a multi-line comment
I can keep adding lines to this*/

var name; // a declared bariable, but not initialized and it's in the global scope

let foo; // a declared variable that can be changed

//const bar; // a declared variable tht cannot be changed - short for constant 

const ANSWER = 42; // const is declared and initialized with the value of 42

/* Strings 
*/

let string1 = "Hello World!" // this is a 'string literal' example and the preffered way - 'This is the way -Mandolorian'

let string2 = new String("Hello World!") // using a 'constructor'

// Number is a data type like string 

let myNum = 9019

let myDecimal = 73.4   // also called a "float". In JavaScript you don't need to specify between floats and intergers. They're both just numbers. 

// Boolean 

let myBool = true;

// Array 

let myArray = [] // This is an empty array 

//              0     1      2       3       4   
let myArray2 = [42, "Bob", myBool, ANSWER, true];

let minObject = {}

const myCar ={
    make: "Chevrolet",
    color: "Red",
    year: "1965",
    vin: "123792317321987213987"
}

// Arrow funtion 

// basic syntax is (arguments) => {}

//a higher order function (HOF) is a function that accepts another function as a parameter
//filter, map and reduce are the most pupular, but forEach, every, find, and some are also HOFs

const theFunction = () => {
    //multiple lines he went away from the page bfore I could copy the notes here
}


/* Variables - containers that store values 
this is a multi-line comment
I can keep adding lines to this*/

var name; // a declared variable, but not initialized and it's in the global scope (BAD)

let foo; // a declared variable that can be changed

//const bar; // a declared variable that cannot be changed - short for 'constant'

const ANSWER = 42; // const is declared and initialized with the value 42

// Strings

let string1 = "Hello World!" // this is a 'string literal' example and the preffered way - 'This is the way'

let string2 = new String("Hello World!") // using a 'constructor'

// Number

let myNum = 20389743

let myDecimal = 73.4  // could also call this a 'float'

// Boolean

let myBool = true

// Array

let myArray = [] // this is an empty array

//              0     1      2        3      4
let myArray2 = [42, "Bob", myBool, ANSWER, true];

let secondElement = myArray2[1] // the second position is at index #1

// Object

let minObject = {}

const myCar = {
  make: "Chevrolet",
  color: "Red",
  year: "1965",
  vin: "2390487sijweoru38lirehs"
}

myCar.numDoors = 4

const anotherObject = {
  wordz: ["foo", "bar", "baz"],
  car: {
    make: "McLaren",
    model: "675LT"
  },
  awesomeness: true
};

// Functions

function myFunction() {
  return "My greeting to you..."
}

function sumTwoThings(one, two) {
  // watch out for data type issues here!
  return one + two // if numbers, will add them.  If strings, will concatenate.
}

// Arrow Functions

// basic syntax is num => 'The Num'

// a higher order function is a function that accepts another function as a parameter.
// filter, map and reduce are the most popular, but forEach, every, find, and some are also HOFs

const theFunction = () => {
  //multiple lines use curly braces and 'return' keyword
  return "I am awesome"
};

// Filter method example.  Filter returns an array of all elements that 'pass the test'
const pilots = [
  {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels"
  },
  {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire"
  },
  {
    id: 40,
    name: "Iden Versio",
    faction: "Empire"
  },
  {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels"
  }
];

const rebels = pilots.filter((pilot) => pilot.faction === "Rebels")
const empire = pilots.filter((pilot) => {
  return pilot.faction === "Empire"
});