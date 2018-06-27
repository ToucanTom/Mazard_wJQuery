let tileObjects = [
    {
        name: "blankTile",
        image: "Media/blankTile.png",
        north: false,
        east: false,
        south: false,
        west: false
    },
    {
        name: "startTile",
        image: "Media/startingTileOriginal.png",
        north: true,
        east: true,
        south: false,
        west: true
    },
    {
        name: "north",
        image: "Media/north.png",
        north: true,
        east: false,
        south: false,
        west: false,
        rotCW: 3

    },
    {
        name: "east",
        image: "Media/east.png",
        north: false,
        east: true,
        south: false,
        west: false,
        rotCW: 4

    },
    {
        name: "south",
        image: "Media/south.png",
        north: false,
        east: false,
        south: true,
        west: false,
        rotCW: 5
    },
    {
        name: "west",
        image: "Media/west.png",
        north: false,
        east: false,
        south: false,
        west: true,
        rotCW: 2

    },
    {
        name: "northEast",
        image: "Media/northEast.png",
        north: true,
        east: true,
        south: false,
        west: false,
        rotCW: 7

    },
    {
        name: "eastSouth",
        image: "Media/eastSouth.png",
        north: false,
        east: true,
        south: true,
        west: false,
        rotCW: 8
    },
    {
        name: "southWest",
        image: "Media/southWest.png",
        north: false,
        east: false,
        south: true,
        west: true,
        rotCW: 9
    },
    {
        name: "northWest",
        image: "Media/northWest.png",
        north: true,
        east: false,
        south: false,
        west: true,
        rotCW: 6
    },
    {
        name: "eastWest",
        image: "Media/eastWest.png",
        north: false,
        east: true,
        south: false,
        west: true,
        rotCW: 11
    },
    {
        name: "northSouth",
        image: "Media/northSouth.png",
        north: true,
        east: false,
        south: true,
        west: false,
        rotCW: 10
    },
    {
        name: "northEastSouth",
        image: "Media/northEastSouth.png",
        north: true,
        east: true,
        south: true,
        west: false,
        rotCW: 13
    },
    {
        name: "eastSouthWest",
        image: "Media/eastSouthWest.png",
        north: false,
        east: true,
        south: true,
        west: true,
        rotCW: 14
    },
    {
        name: "northSouthWest",
        image: "Media/northSouthWest.png",
        north: true,
        east: false,
        south: true,
        west: true,
        rotCW: 15
    },
    {
        name: "northEastWest",
        image: "Media/northEastWest.png",
        north: true,
        east: true,
        south: false,
        west: true,
        rotCW: 12
    },
    {
        name: "northEastSouthWest",
        image: "Media/northEastSouthWest.png",
        north: true,
        east: true,
        south: true,
        west: true,
        rotCW: 16
    },
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
let diceOptions = [
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
let gameBoardSize = {
    row: 6,
    col: 6
};
let playerObjects = {
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
let items = {
    dropRate: 45,
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
let currentPlayer = {
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
let currentFoe ={
    name: "",
    image:"",
    hp: 0,
    armor: 0,
    attack: 0,
    gold: 0,
    rowLocation: 0,
    colLocation: 0
};
let foeOptions = [
    {name: "Skeleton", hp: 1, armor: 1, attack: 1, gold:1, image: "Media/pixelSkeleton.gif"},
    {name: "Lion", hp:2, armor:2, attack: 2, gold:2,  image: "Media/lion.png"},
    {name: "Knight", hp:3, armor: 3, attack: 1, gold:3, image: "Media/knight.png"}
];
let currentGameBoard = [];
let startingTileRow = 0;
let startingTileCol = 0;
function updateGameBoardTileObject(target , template){
    console.log("updateGameBoardTileObject was called");
    if (target.north === true || target.east === true || target.south === true || target.west === true) {
        target.rotCW = template.rotCW;
    }
    target.image = template.image;
    target.north = template.north;
    target.east = template.east;
    target.south = template.south;
    target.west = template.west;
}
let currentTile =  {
    image: "",
    north: true,
    east: true,
    south: false,
    west: true,
    available: false,
    location:"0-0",
    rotCW: 0,
    rotCCW: 0,
    hasFoe: false
};
let currentConnectedTiles = [];
let tileCountDown;
let totalTiles = gameBoardSize.row * gameBoardSize.col;
let currentLevel = 1;
let immobile = false;
function selectRandomTile(directionOfSelectedTile){
    let filteredTileKeys = [];
    let index = 0;
    let i = 0;
    switch (directionOfSelectedTile) {
        case "north":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].south === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        case "east":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].west === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        case "south":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].north === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        case "west":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].east === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
    }
    let randNum = Math.floor(Math.random() * index);
    return filteredTileKeys[randNum];
}