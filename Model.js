
// Details on all images used as tiles
// *** Note: Add to bottom of list to not change order

var tileObjects = [
    {//0
        name: "blankTile",
        image: "Media/blankTile.png",
        north: false,
        east: false,
        south: false,
        west: false
    },
    {//1
        name: "startTile",
        image: "Media/startingTileOriginal.png",
        north: true,
        east: true,
        south: false,
        west: true
    },
    //1 way
    {//2
        name: "north",
        image: "Media/north.png",
        north: true,
        east: false,
        south: false,
        west: false,
        rotCW: 3

    },
    {//3
        name: "east",
        image: "Media/east.png",
        north: false,
        east: true,
        south: false,
        west: false,
        rotCW: 4

    },
    {//4
        name: "south",
        image: "Media/south.png",
        north: false,
        east: false,
        south: true,
        west: false,
        rotCW: 5
    },
    {//5
        name: "west",
        image: "Media/west.png",
        north: false,
        east: false,
        south: false,
        west: true,
        rotCW: 2

    },
   //2 way
    {//6
        name: "northEast",
        image: "Media/northEast.png",
        north: true,
        east: true,
        south: false,
        west: false,
        rotCW: 7

    },
    {//7
        name: "eastSouth",
        image: "Media/eastSouth.png",
        north: false,
        east: true,
        south: true,
        west: false,
        rotCW: 8
    },
    {//8
        name: "southWest",
        image: "Media/southWest.png",
        north: false,
        east: false,
        south: true,
        west: true,
        rotCW: 9
    },
    {//9
        name: "northWest",
        image: "Media/northWest.png",
        north: true,
        east: false,
        south: false,
        west: true,
        rotCW: 6
    },
    //straight
    {//10
        name: "eastWest",
        image: "Media/eastWest.png",
        north: false,
        east: true,
        south: false,
        west: true,
        rotCW: 11
    },
    {//11
        name: "northSouth",
        image: "Media/northSouth.png",
        north: true,
        east: false,
        south: true,
        west: false,
        rotCW: 10
    },
    //3 way
    {//12
        name: "northEastSouth",
        image: "Media/northEastSouth.png",
        north: true,
        east: true,
        south: true,
        west: false,
        rotCW: 13
    },
    {//13
        name: "eastSouthWest",
        image: "Media/eastSouthWest.png",
        north: false,
        east: true,
        south: true,
        west: true,
        rotCW: 14
    },
    {//14
        name: "northSouthWest",
        image: "Media/northSouthWest.png",
        north: true,
        east: false,
        south: true,
        west: true,
        rotCW: 15
    },
    {//15
        name: "northEastWest",
        image: "Media/northEastWest.png",
        north: true,
        east: true,
        south: false,
        west: true,
        rotCW: 12
    },
    //4 way
    {//16
        name: "northEastSouthWest",
        image: "Media/northEastSouthWest.png",
        north: true,
        east: true,
        south: true,
        west: true,
        rotCW: 16
    },
    //player images
    {
        name: "human",
        image: "Media/human.png"
    },
    {
        name: "elf",
        image: "Media/Elf.png"
    },
    {
        name: "dwarf",
        image: "Media/Dwarf.png"
    }
];

var diceOptions = [
    {
        image: "Media/dieOne.png"
    },
    {
        image: "Media/dieTwo.png"
    },
    {
        image: "Media/dieThree.png"
    },
    {
        image: "Media/dieFour.png"
    },
    {
        image: "Media/dieFive.png"
    },
    {
        image: "Media/dieSix.png"
    }
];

// Determines visual game board size
var gameBoardSize = {
    row: 6,
    col: 6
};
/* List of Race Options */
var playerObjects = {
    "Human" : {
        image: "Media/pixelKnight.gif",
        race : "Human",
        attack: 1,
        hp: 15,
        armor: 2
    },
    "Dwarf" : {
        image: "Media/Dwarf.png",
        race: "Dwarf",
        attack: 1,
        hp: 20,
        armor: 1
    },
    "Elf" : {
        image: "Media/elfmage.png",
        race:"Elf",
        attack: 2,
        hp: 12,
        armor: 1
    }
};

var items = {
    dropRate: 45, // This is a percentage
    "bread" : {
        image: "Media/bread.png",
        remaining: 2
    },
    "chest" : {
        image: "Media/chest.png",
        remaining: 2
    },
    "key" : {
        image: "Media/key.png",
        remaining: 2
    },
    "sword" : {
        image: "Media/pixelSword.gif",
        remaining: 1
    }
};

/* Current Player Object */
var currentPlayer = {
    image: "",
    race: "",
    hp: 0,
    attack: 0,
    armor: 0,
    keys: 0,
    gold: 0,
    hasSword: false,
    rowLocation: 0,
    colLocation: 0

};
var currentFoe ={
    name: "",
    image:"",
    hp: 0,
    armor: 0,
    attack: 0,
    gold: 0,
    rowLocation: 0,
    colLocation: 0
};
var foeOptions = [
    {name: "Skeleton", hp: 1, armor: 1, attack: 1, gold:1, image: "Media/pixelSkeleton.gif"},
    {name: "Lion", hp:2, armor:2, attack: 2, gold:2,  image: "Media/lion.png"},
    {name: "Knight", hp:3, armor: 3, attack: 1, gold:3, image: "Media/knight.png"}
];
/* This is our global game board
    Grid Element Data Members:
        location: (0,0) is top left
        connected: is this element currently connected to the element your player is on?
        hasFoe: does it have a foe?
        foe: foe object
        staged: is this element staged
        droppedItem: "(the items name here)"

        blocked: is movement to this element by the player blocked?  <-------- Need to modify:
            ** this could be true or false depending on which direction you come to the tile from
            ** Thought: just use the north, east, south, west members of t_object. Set to false if blocked

        available: is this element currently completely unoccupied?
        t_object {   <--- tile object the element holds
           image
           north
           east
           south
           west }

*/
var currentGameBoard = [];

var startingTileRow = 0;
var startingTileCol = 0;

function updateGameBoardTileObject(target , template){
    console.log("updateGameBoardTileObject was called");

    if (target.north === true || target.east === true || target.south === true || target.west === true) {
        target.rotCCW = template.rotCCW;
        target.rotCW = template.rotCW;
    }
    target.image = template.image;
    target.north = template.north;
    target.east = template.east;
    target.south = template.south;
    target.west = template.west;
}

var currentTile =  {
    image: "",
    north: true,
    east: true,
    south: false,
    west: true,
    available: false,
    location:"0,0",
    rotCW: 0,
    rotCCW: 0,
    hasFoe: false
};

/*contains the location of tiles connected to the players current location in #,# format*/
var currentConnectedTiles = [];

var tileCountDown;

var totalTiles = gameBoardSize.row * gameBoardSize.col;

var currentLevel = 1;

var immobile = false;

function selectRandomTile(directionOfSelectedTile){
    var filteredTileKeys = [];
    var index = 0;
    var i = 0;
    switch (directionOfSelectedTile) {
        // IF TILE SELECTED IS NORTH OF THE CURRENT TILE OF THE PLAYER
        case "north":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].south === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        // IF TILE SELECTED IS EAST OF THE CURRENT TILE OF THE PLAYER
        case "east":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].west === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        // IF TILE SELECTED IS SOUTH OF THE CURRENT TILE OF THE PLAYER
        case "south":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].north === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        // IF TILE SELECTED IS WEST OF THE CURRENT TILE OF THE PLAYER
        case "west":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].east === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
    }
    var randNum = Math.floor(Math.random() * index);
    return filteredTileKeys[randNum];
}
//var setClickableTiles = [];