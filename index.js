const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//This is the introductory welcome message for the game. 
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
  }
}
}


//Creating the room class
class room {
//utilizing the constructor method and passing in arguments to constructor
	constructor(name, description, inventory, locked){

  //mapping the 'this' keyword to the arguments passed in the constructor
	this.name = name;

  this.description = description;

	this.inventory = inventory;

  this.locked = locked;
	}

  use() {
    console.log("use");
  }
  
  move(){
    console.log("move");
  }
  talk(){
    console.log("The people in the village are called the thal's.\n. The Thal's warn you that the city is inhabited by an evil alien race called the Daleks");
  }
  labratory(){
    console.log("Oh no! The room is filled with daleks! Exterminate. Game is over you are dead")
  }

}

//Creating item class
class item {
  constructor(name, description){
    this.name = name;
    this.description = description;
  }
} 


//create new object of the room class - "Tardis"
let Tardis = new room("Tardis","it is bigger on the inside thant it looks from the outside.");

//create new object of the room class - "Jungle"
let Jungle = new room("Jungle", "it is desolate and nothing is growing.");

//Create new object of the room class -"City"
let City = new room();

//create new object of the room class - "Hallway"
let Hallway = new room();

//create new object of the room class - "Labratory"
let Labratory = new room();

//Create ne object of the room class - "Center"
let Center = new room();

//create lookup table to map the room keyword to the object
let roomLookUp = {
  tardis: Tardis,
  jungle: Jungle,
  city: City,
  hallway: Hallway,
  labratory: Labratory,
  center: Center,
};

//create state machine to hold allowable transitions
let roomStateMachine = {
  tardis: ["Jungle"],
  jungle: ["City",],
  city: ["Hallway"],
  hallway: ["Labratory"],
  labratory:["Center", "Hallway"],
  center: ["Hallway"],
};



//define the current location state
let currentLocation = "tardis";

//Create a start game function for a starting point for the game. You can move out of the Tardis into the jungle
async function startGame(){
  const actionMessage = `You are currently in the ${roomLookUp[currentLocation].name} ${roomLookUp[currentLocation].description}.\n
  In front of you is the control panel and it looks like you can [use] it.\n
  To the left of you are the doors where the jungle lies outside. You could [move jungle] to explore the jungle.\n
  What would you like to do?\n  >_`;
  let answer = await ask(actionMessage);
 
  if (answer === "use"){
    roomLookUp[currentLocation].use()
  }
  if(answer === "move jungle"){
    roomLookUp[currentLocation].move()
    if(roomStateMachine[currentLocation].includes("Jungle")){
      currentLocation = "jungle"
      jungle(currentLocation);
      //console.log(currentLocation);
    }
  }
  else{
    console.log("You cant go there from here");
  }
}



/*I'm thinking maybe I don't need sperate async functions for each location, but maybe one async function
to include all of the rooms and possible ways to move around. I'm still trying figure out how that
would work.
*/
//Function to move to the jungle
async function jungle(currentLocation){
  const actionMessage = `You are currently in the ${roomLookUp[currentLocation].name}.\n
  To the right of you is a village with people in it. It looks like you can [talk] to them.\n
  Beyond the jungle is a city. It looks like you could [move] there.
  What would you like to do?\n  >_`;
  let answer = await ask(actionMessage);
 
  if (answer === "talk"){
    roomLookUp[currentLocation].talk()
    //***This does not seem to work to update the location and move to the city. */
    if(roomStateMachine[currentLocation].includes("City")){
      //console.log(currentLocation)
      currentLocation = "city"
  }
}
  if(answer === "move city"){
    roomLookUp[currentLocation].move()
    if(roomStateMachine[currentLocation].includes("City")){
      currentLocation = "city"
      city(currentLocation);
      //console.log(currentLocation);
    }
  }
  else{
    console.log("You cant go there from here");
  }
  
}

//function to move to the city
async function city(currentLocation){
  const actionMessage = `You are currently in the ${roomLookUp[currentLocation].name}.\n
  Infront of you are doors that you could [open]\n
  What would you like to do?\n  >_`;
  let answer = await ask(actionMessage);
 
  if (answer === "move city"){
    roomLookUp[currentLocation].talk();
  }
  if(answer === "open door"){
    roomLookUp[currentLocation].move()
    if(roomStateMachine[currentLocation].includes("City")){
      currentLocation = "city"
      //this is not working to move into the final moves function
      finalMoves(currentLocation);
    }
  }
  else{
    console.log("You cant go there from here");
  }
}

//function to move within the city
async function finalMoves(currentLocation){
    const actionMessage = `You are currently in the ${roomLookUp[currentLocation].name}.\n
    To the left of you are doors that lead to a [labratory]\n
    Down the hallway is another set of doors that lead to the [center] or the city\n
    Remember to watch out for Daleks! 
    Where would you like to go?  >_`;
    let answer = await ask(actionMessage);
   
    if (answer === "move labratory"){
      roomLookUp[currentLocation].labratory();
      process.exit()
    }
    if(answer === "move center"){
      roomLookUp[currentLocation].move()
      if(roomStateMachine[currentLocation].includes("City")){
        currentLocation = "city"
        console.log(currentLocation);
      }
    }
    else{
      console.log("You cant go there from here");
    }
    
  }
  