//////movement functions////////////////
// move used as the onclick attribute
function move() {
    if (immobile) {
        return;
    }
    var row = this.parentNode.rowIndex;
    var col = this.cellIndex;

    //win condition
    if (row === startingTileRow && col === startingTileCol && currentPlayer.gold >= 25) {
        document.getElementById("win").play();
        $("#message").html("You win!").show();

    }

//check to see if their is a chest at current location, if not then remove player image only:
    if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
    else{
        document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
    }
    //update player location to new spot
    currentPlayer.rowLocation = row;
    currentPlayer.colLocation = col;
    var chest = false;
    switch (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem) {
        case("bread"):
            currentPlayer.hp += 1;
            break;
        case("key"):
            //add a key to player inventory
            currentPlayer.keys += 1;
            break;
        case("chest"):
            //if player has a key, open chest, if not.... dont
            if(currentPlayer.keys > 0){
                currentPlayer.keys -= 1;
                currentPlayer.gold += 5;
            }
            else{
                chest = true;
            }

            break;
        case("sword"):
            //add sword to player inventory and add 1 to attack
            currentPlayer.attack += 1;
            currentPlayer.hasSword = true;
            //update player display
            break;
        default:
            //there is no droppedItem, so do nothing
            break;
    }
    updateStats();
    if(!chest) currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem = "";
    $('#'+row + ',' + col).html("<img src = " + currentPlayer.image + ">");
    clearClickableSettings();
    setOnclickSettings();
    $("#deck").click(stageTiles);
}
//move function used as the keydown event listener
function move2(){
    // only run if there isnt a tile being placed
    if(immobile) {
        return;
    }
    console.log("move2 was called");
    var currentSurroundingTiles = getSurroundingTiles();
    var i;
    var keyCode = event.keyCode;
    console.log("the key code is " + keyCode);
    // todo
    // there is a problem with stage tiles if you move using the buttons

    switch (keyCode) {
        // down 's'
        case(83):
        case(40):
            // down ^
            if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].staged) {
                flipTile2(currentPlayer.rowLocation + 1, currentPlayer.colLocation);
            }
            else if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].connected) {

                //resets move options now that the player has moved
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else{
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.rowLocation++;
                //win condition
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById("win").play();
                    $("#message").html("You win!").show();
                }
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                $("#deck").click(stageTiles);
            }
            break;
        // right 'D'
        case(68):
        case(39):
            // right >
            if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].staged) {
                flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation + 1);
            }
            else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else{
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.colLocation++;
                //win condition
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById("win").play();
                    $("#message").html("You win!").show();

                }
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                $("#deck").click(stageTiles);
            }
            break;
        // up ^
        case(38):
        case(87):
            // up 'W'
            if (currentGameBoard[currentPlayer.rowLocation - 1][currentPlayer.colLocation].staged) {
                flipTile2(currentPlayer.rowLocation - 1, currentPlayer.colLocation);
            }
            else if (currentGameBoard[currentPlayer.rowLocation - 1][currentPlayer.colLocation].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else{
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.rowLocation--;
                //win condition
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById("win").play();
                    document.getElementById("message").innerHTML = "You win!";
                    document.getElementById("message").style.display = "inline";
                }
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                document.getElementById("deck").onclick = stageTiles;
            }
            break;
        // left <
        case(37):
        case(65):
            // left 'A'
            if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation - 1].staged) {
                flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation - 1);
            }
            else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation - 1].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "chest"){
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.colLocation--;
                //win condition
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById("win").play();
                    document.getElementById("message").innerHTML = "You win!";
                    document.getElementById("message").style.display = "inline";
                }
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                document.getElementById("deck").onclick = stageTiles;
            }
            break;
    }
    var chest = false;
    switch (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem) {
        case("bread"):
            //recover health
            currentPlayer.hp += 1;
            break;
        case("key"):
            //add a key to player inventory
            currentPlayer.keys += 1;
            break;
        case("chest"):
            //if player has a key, open chest, if not.... dont
            if(currentPlayer.keys > 0){
                currentPlayer.keys -= 1;
                currentPlayer.gold += 5;
            }else{
                chest = true;
            }

            break;
        case("sword"):
            //add sword to player inventory and add 1 to attack
            currentPlayer.attack += 1;
            currentPlayer.hasSword = true;
            //
            break;
        default:
            //there is no droppedItem, so do nothing
            break;
    }
    updateStats();
    if(!chest) currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem = "";
    // update currentConnected[]
    currentConnectedTiles = [];
    getSurroundingTiles();
}
////////////////////////////////