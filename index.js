const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

welcome();

async function welcome() {
  const welcomeMessage = `The tardis(Time and Relative Dimensions in Space) lands on a new world. \n 
Everything on the world is dead except there is a large metal city beyond a jungle. \n
Would you like to explore this new world? [Yes] or [No] \n  >_`;
  let answer = await ask(welcomeMessage);
  

//Logic to check to see if the answer input is Yes or No
while(true){
  if (answer === "No"){
    console.log("You remain in the Tardis and do not explore the new world :(")
    process.exit()
  } 
  if (answer === "Yes"){
  return startGame()
  
  //process.exit()
  }
}
}

//define your current location state
//let currentLocation = Tardis;

//Create a start game function to tell you what your current room is 
async function startGame(){
 console.log(`You are currently in the ${Tardis.description}`)
}


//uUtilizing the constructor method and passing in our arguments to construct
class room {
//mapping the 'this' keyword to the arguments passed in the constructor
	constructor(name, connections, item){

	this.name = name

  this.connections = connections

	this.item = item

	}
}


//create new object of the room class - "Tardis"
let Tardis = new room("Tardis",[]);

//create new object of the room class - "Hall"
let Hallway = new room("Tardis", "Labratory", "Cell");

//create new object of the room class - "Power"
let Power = new room();

//Create new object of the room class -"Cell"
let Cell = new room();

//create new object of the room class - "Labratory"
let Labratory = new room();

//Create ne object of the room class - "Center"
let Center = new room();

//create lookup table to map the room keyword to the object
let roomLookUp = {
  tardis: Tardis,
  hallway: Hallway,
  power: Power,
  cell: Cell,
  labratory: Labratory,
  center: Center,
};

//create state machine to hold allowable transitions
let roomStateMachine = {
  tardis: ["Hallway"],
  hallway: ["Labratory", "Center", "Power"],
  power: ["Hallway", "Cell"],
  labratory:["Hallway", "Center"],
  cell: ["Hallway"],
  center: ["Hallway"],
};

