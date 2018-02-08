/////////GameBoard generation/////////////////
function genGameBoard() {
    $('#newLevel').hide();
    $('#rotateCW').hide();
    $('#setRotate').hide();
    tileCountDown = totalTiles-1;
    var gameBoard = document.getElementById("gameBoard");
    var html = "";

    // Random number generated for random starting location
    var randNum = Math.floor(Math.random()*(gameBoardSize.col-2)) + 1;
    console.log(randNum);
    for (var i = 0; i < gameBoardSize.row; i++) {
        html += "<tr>";
        var temp_array = [];
        for (var j = 0; j < gameBoardSize.col; j++) {

            // Checks to place starting tile in random location on bottom row
            if (i === gameBoardSize.row-1 && j === randNum) {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[1].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, droppedItem: "", connected: false, hasFoe: false, foe: {}, staged: false, blocked: false, available: false, t_object: {image: tileObjects[1].image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
                startingTileRow = i;
                startingTileCol = j;
            }
            else {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[0].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, droppedItem: "", connected: false, hasFoe: false, foe: {}, staged: false, blocked: false, available: true, t_object: {image: tileObjects[0].image, north: false, east: false, south: false, west: false}};
            }
            // ****** IF YOU CHANGED THE CREATION OF THE GAME BOARD, UPDATE IN Model.js ******
        }
        html += "</td>";
        currentGameBoard[i] = temp_array;
    }
    gameBoard.innerHTML = html;
    $("#currentLevel").html( "Level " + currentLevel);
    if (currentLevel === 1) {
        populatePlayerOptions();
    }
    else {
        document.getElementById(currentPlayer.rowLocation+","+currentPlayer.colLocation).innerHTML = "<img src = "+currentPlayer.image+">";
        $("#deck").click(stageTiles);
    }

}
//////////////////////////////////////

/////////information getters////////////
// returns an array of the surrounding tile objects from currentGameBoard
function getSurroundingTiles(){
    var tiles = [];
    var counter = 0;
    var counter2 = 0;
    var row = currentPlayer.rowLocation;
    var col = currentPlayer.colLocation;

    // For North Tile
    if(row-1 >= 0 && currentGameBoard[row][col].t_object.north &&
        (currentGameBoard[row-1][col].available || currentGameBoard[row-1][col].staged || currentGameBoard[row-1][col].t_object.south)) {

        tiles[counter] = currentGameBoard[row-1][col];
        if(currentGameBoard[row-1][col].t_object.south){
            currentGameBoard[row-1][col].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row-1][col].location;
        }
        counter++;
    }

    // For East Tile
    if (col+1 < gameBoardSize.col && currentGameBoard[row][col].t_object.east &&
        (currentGameBoard[row][col+1].available || currentGameBoard[row][col+1].staged || currentGameBoard[row][col+1].t_object.west)) {

        tiles[counter] = currentGameBoard[row][col+1];
        if(currentGameBoard[row][col+1].t_object.west){
            currentGameBoard[row][col+1].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row][col+1].location;
        }
        counter++;
    }

    // For South Tile
    if (row+1 < gameBoardSize.row && currentGameBoard[row][col].t_object.south &&
        (currentGameBoard[row+1][col].available || currentGameBoard[row+1][col].staged || currentGameBoard[row+1][col].t_object.north)) {
        tiles[counter] = currentGameBoard[row+1][col];
        if(currentGameBoard[row+1][col].t_object.north){
            currentGameBoard[row+1][col].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row+1][col].location;
        }
        counter++;
    }

    // For West Tile
    if (col-1 >= 0 && currentGameBoard[row][col].t_object.west &&
        (currentGameBoard[row][col-1].available || currentGameBoard[row][col-1].staged || currentGameBoard[row][col-1].t_object.east)) {
        tiles[counter] = currentGameBoard[row][col-1];
        if(currentGameBoard[row][col-1].t_object.east) {
            currentGameBoard[row][col-1].connected = true;
            currentConnectedTiles[counter2] = currentGameBoard[row][col-1].location;
        }
    }

    return tiles;
}
function setOnclickSettings(){
    var targets = getSurroundingTiles();
    for (var i = 0; i<targets.length; i++){
        if (targets[i].available) {
            $('#deck').click(stageTiles);
        }
        else if(targets[i].staged) {
            document.getElementById(targets[i].location).onclick = flipTile2;
        } else {
            document.getElementById(targets[i].location).onclick = move;
            // document.getElementById(targets[i].location).addEventListener("onkeydown",function (){} );
        }
    }
}
//////////////////////////////

//////////End Game Functions///////////////////////this function is not currently used
function genNewLevel() {
    currentLevel++;
    document.getElementById("win").play();
    document.getElementById("newLevel").style.display = "inline";
    document.getElementById("newLevel").innerHTML = "Go to Level " + currentLevel;
    document.getElementById("newLevel").onclick = genGameBoard;
    gameBoardSize.row++;
    totalTiles+=6;
}
//////////////////////////////

//////////???????????????
function clearClickableSettings() {
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = "";
    }
}
// Updates players stats
function updateStats() {
    var option = document.getElementsByClassName("playerStats");
    option[0].innerHTML = "<img src = " + currentPlayer.image + ">";
    option[1].innerHTML = "Health: " + currentPlayer.hp;
    option[2].innerHTML = "Attack: " + currentPlayer.attack;
    option[3].innerHTML = "Armor: " + currentPlayer.armor;
    option[4].style.backgroundImage = "url('Media/key.png')";
    option[4].style.marginTop= "15px";
    option[4].style.paddingTop = "35px";
    option[4].style.paddingLeft = "5px";
    option[4].innerHTML = currentPlayer.keys;
    document.getElementById("gold").innerHTML = currentPlayer.gold;
    if(currentPlayer.hasSword) $("#sword").show();

}
//////////////////////////////

/*/////////Elephant bone yard/////////*/
/* function placeTile() */
 /*{

    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";
    currentGameBoard[row][col].available = false;
    for (var j = 0; j < setClickableTiles.length; j++) {
        document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).innerHTML = "";
        document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).onclick = "";
    }
    setClickableTiles = [];
    document.getElementById("deck").style.backgroundImage = "";
    setOnclickSettings();
    // document.getElementById("deck").innerHTML = "Generate Tile";//this should be in our setOnclickSettings function
    // document.getElementById("deck").onclick = flipTile;
}
*/
/*function genPlacementOptions()*/
/*{
    var counter = 0;
    var playerLocationTile = currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation];
    if (currentPlayer.rowLocation-1 >= 0 && playerLocationTile.t_object.north && currentGameBoard[currentPlayer.rowLocation-1][currentPlayer.colLocation].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation-1, y: currentPlayer.colLocation};
        counter++;
    }
    if (currentPlayer.colLocation+1 <= gameBoardSize.col && playerLocationTile.t_object.east && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation+1].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation, y: currentPlayer.colLocation+1};
        counter++;
    }
    if (currentPlayer.rowLocation+1 <= gameBoardSize.row && playerLocationTile.t_object.south && currentGameBoard[currentPlayer.rowLocation+1][currentPlayer.colLocation].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation+1, y: currentPlayer.colLocation};
        counter++;
    }
    if (currentPlayer.colLocation-1 >= 0 && playerLocationTile.t_object.west && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation-1].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation, y: currentPlayer.colLocation-1};
    }
    // IF TILE DOESNT MATCH, GENERATE NEW TILE
    // IF ALL POSSIBLE OUTLETS OF CURRENT TILE NOT AVAILABLE, STOP GENERATING TILES - MUST MOVE CHARACTER
    if (setClickableTiles.length === 0) {
        document.getElementById("deck").innerHTML = "You must move your character to proceed";
    }
    else {
        for (var j = 0; j < setClickableTiles.length; j++) {
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).innerHTML = "Select a path to continue your journey";
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).onclick = flipTile;
        }
    }
}*/
/*function  fliptTile()*/
/*function flipTile(){
    // updateGameBoardTileObject(currentTile, selectRandomTile());
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;

    tileCountDown--;
    if (tileCountDown === 0) {
        currentLevel++;
        document.getElementById("win").play();
        document.getElementById("newLevel").style.display = "inline";
        document.getElementById("newLevel").innerHTML = "Go to Level " + currentLevel;
        document.getElementById("newLevel").onclick = genGameBoard;
        document.getElementById("deck").onclick = stageTiles;
        gameBoardSize.row++;
        totalTiles+=6;
    }

    // sets clicked tile location to unavailable
    currentGameBoard[row][col].available = false;
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
    //decide if there is a foe
    var randNum = Math.floor((Math.random()*8));
    if (randNum <= 2) {
        currentTile.hasFoe = true;
        currentFoe = foeOptions[randNum];
    }
    // set location of current tile
    currentTile.location = row + "," + col;

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    // something weird is going on here with the true false setting on has foe. im not sure i get it....
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";

    if (currentTile.hasFoe) document.getElementById(row + "," + col).innerHTML = "<img src = " + currentFoe.image + ">";

    currentTile.hasFoe = false;
    /////////////////////////////////////////////////////////////////////////////////
    // Generates rotation buttons to be able to rotate randomly selected tile
    genRotateDivs();

    // Sets all other surrounding tiles to unclickable until you finish rotating the current tile
    clearClickableSettings();

}*/

//todo create a limit on how long you can go without fighting a monster, and how many you can fight at once