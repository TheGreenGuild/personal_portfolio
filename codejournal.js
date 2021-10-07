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