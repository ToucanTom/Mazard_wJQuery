///////Tile generation and placement//////////////////////
// used for buttons
function flipTile2(row, col){
    // Checks for clicking vs key presses
    if (col === undefined) {
        row = this.parentNode.rowIndex;
        col = this.cellIndex;
    }

    // flag to inhibit movement
    immobile = true;
    console.log("flipTile2 was called");

    // 25% chance to generate a foe to fight and return to stage tile state if foe generated
    var randNum = Math.floor(Math.random()*100)+1;
    if (randNum <= 25) {
        randNum = Math.floor(Math.random()*100)+1;//reset randNum to be used as the enemy options index
        var index =0;
        if(randNum <= 40) index = 0;
        else if (randNum <= 75) index = 1;
        else index = 2;
        // Show a message that you are about to battle
        document.getElementById("message").innerHTML = "A enemy has spotted you!";
        document.getElementById("message").style.display = "inline";
        document.getElementById("newFoe").style.backgroundImage = "url(" + foeOptions[index].image + ")";
        document.getElementById("newFoe").style.display = "inline";
        // Waits 2 seconds before proceeding with the battle
        setTimeout(function() {battle(foeOptions[index])}, 4000);

        return;
        //currentFoe = foeOptions[randNum];
        //currentTile.hasFoe = true;
    }

    tileCountDown--;

    // Now that the tile is flipped, it is no longer staged
    currentGameBoard[row][col].staged = false;

    // Generates appropriate tile for location clicked and sets it to currentTile
    if (row === currentPlayer.rowLocation-1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("north"));
    }
    if (col === currentPlayer.colLocation+1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("east"));
    }
    if (row === currentPlayer.rowLocation+1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("south"));
    }
    if (col === currentPlayer.colLocation-1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("west"));
    }

    // set location of current tile
    currentTile.location = row + "," + col;

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";

    // Generates rotation buttons to be able to rotate randomly selected tile
    genRotateDivs();

    // Sets all other surrounding tiles to unclickable until you finish rotating the current tile
    clearClickableSettings();

}
// places unflipped cards from the deck onto spots surrounding current player
function stageTiles() {

    var setClickableTiles = getSurroundingTiles();
    for (var i = 0; i < setClickableTiles.length; i++) {
        if (setClickableTiles[i].available) { // if not already occupied
            document.getElementById(setClickableTiles[i].location).style.backgroundImage = "url(Media/gameDeck.png)";       // Set background as deck
            currentGameBoard[setClickableTiles[i].location[0]][setClickableTiles[i].location[2]].staged = true;             // update model
            currentGameBoard[setClickableTiles[i].location[0]][setClickableTiles[i].location[2]].available = false;
        }
    }
    // Turn off deck while player chooses a staged tile to be flipped
    document.getElementById("deck").onclick = "";
    document.getElementById("deck").innerHTML = "";
    setOnclickSettings();
}
function genRotateDivs() {
    var rotateCWDiv = document.getElementById("rotateCW");
    var setRotateDiv = document.getElementById("setRotate");

    // Display Box

    rotateCWDiv.style.display = "inline";
    setRotateDiv.style.display = "inline";

    // Display Text in Box

    rotateCWDiv.innerHTML = "Rotate Clockwise";
    setRotateDiv.innerHTML = "Set Rotation";

    // Set on Click
    rotateCWDiv.onclick = rotateCW;
    setRotateDiv.onclick = setRotation;
}
function rotateCW() {
    updateGameBoardTileObject(currentTile, tileObjects[currentTile.rotCCW]);
    document.getElementById(currentTile.location).style.backgroundImage = "url(" + currentTile.image + ")";
}

///TODO find a way to abstract item drop logic
function setRotation() {

    // Turn off all rotate options and hide boxes
    document.getElementById("rotateCW").onclick = "";
    document.getElementById("rotateCW").onclick = "";
    document.getElementById("setRotate").onclick = "";
    document.getElementById("rotateCW").style.display = "none";
    document.getElementById("rotateCW").style.display = "none";
    document.getElementById("setRotate").style.display = "none";


    // Update gameboard
    updateGameBoardTileObject(currentGameBoard[currentTile.location[0]][currentTile.location[2]].t_object,currentTile);

    // Allow movement
    immobile = false;

    // Display droppedItem if dropped//////////////////////////
    var rand = Math.floor((Math.random()*100)+1);
    if (items.dropRate >= rand) {
        rand = Math.floor((Math.random()*100)+1);//now that we know we will have an droppedItem we reset the number to anything between 1-100 so that the droppedItem chances are more clear
        var targetElement = currentGameBoard[currentTile.location[0]][currentTile.location[2]];
        if (rand <= 10 && !currentPlayer.hasSword) {//between 1-10 (10% chance)
            //drop sword
            document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.sword.image+">";
            //update gameboard
            targetElement.droppedItem = "sword";
        }
        else if (rand <= 50) {//between 11-50 (40% chance)
            //drop chest or key
            // if rand is even: key
            if(rand%2 === 0){
                document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.key.image+">";
                //update gameboard
                targetElement.droppedItem = "key";
            }
            else{
                document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.chest.image+">";
                //update gameboard
                targetElement.droppedItem = "chest";
            }
            // if rand is odd: chest
        }
        else {//between 51-100 (50% chance)
            //drop bread
            document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.bread.image+">";
            //update gameboard
            targetElement.droppedItem = "bread";
        }


    }
///////////////////////////////////////////////////

    setOnclickSettings();
}
///////////////////////////////