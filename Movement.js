function move() {
    if (immobile) {
        console.log('player is immoble!');
        return;
    }
    let row = this.parentNode.rowIndex;
    let col = this.cellIndex;
    if (row === startingTileRow && col === startingTileCol && currentPlayer.gold >= 25) {
        $('#win')[0].play();
        $("#message").html('You win!').show();
    }
    if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).empty();
    else{
        $('#'+ currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src ="+items.chest.image +">");
    }
    currentPlayer.rowLocation = row;
    currentPlayer.colLocation = col;
    let chest = false;
    switch (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem) {
        case("bread"):
            currentPlayer.hp += 1;
            break;
        case("key"):
            currentPlayer.keys += 1;
            break;
        case("chest"):
            if(currentPlayer.keys > 0){
                currentPlayer.keys -= 1;
                currentPlayer.gold += 5;
            }
            else{
                chest = true;
            }
            break;
        case("sword"):
            currentPlayer.attack += 1;
            currentPlayer.hasSword = true;
            break;
        default:
            break;
    }
    updateStats();
    if(!chest) currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem = "";
    $('#'+row + '-' + col).html("<img src = " + currentPlayer.image + ">");
    clearClickableSettings();
    setOnclickSettings();
    $("#deck").click(stageTiles);
}
function move2(){
    if(immobile) {
        console.log('player is immoble!');
        return;
    }
    console.log("move2 was called");
    let currentSurroundingTiles = getSurroundingTiles();
    let i;
    let keyCode = event.keyCode;
    console.log("the key code is " + keyCode);
    switch (keyCode) {
        // down 's'
        case(83):
        case(40):
            if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].staged) {
                flipTile2(currentPlayer.rowLocation + 1, currentPlayer.colLocation);
            }
            else if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).empty();
                else{
                    $('#'+currentPlayer.rowLocation +'-'+ currentPlayer.colLocation).html("<img src ="+items.chest.image +">");
                }
                currentPlayer.rowLocation++;
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById('win').play();
                    $("#message").html('You win!').show();
                }
                $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src=" + currentPlayer.image + ">");
                clearClickableSettings();
                setOnclickSettings();
                $("#deck").click(stageTiles);
            }
            break;
        // right 'D'
        case(68):
        case(39):
            if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].staged) {
                flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation + 1);
            }
            else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).empty();
                else{
                    $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src ="+items.chest.image +">");
                }
                currentPlayer.colLocation++;
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById('win').play();
                    $("#message").html('You win!').show();
                }
                $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src=" + currentPlayer.image + ">");
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
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).empty();
                else{
                    $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src ="+items.chest.image +">");
                }
                currentPlayer.rowLocation--;
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById('win').play();
                    $('#message').html('You win!').show();

                }
                $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src=" + currentPlayer.image + ">");
                clearClickableSettings();
                setOnclickSettings();
                $('#deck').click(stageTiles);
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
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).empty();
                else if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "chest"){
                    $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src ="+items.chest.image +">");
                }
                currentPlayer.colLocation--;
                if (currentPlayer.rowLocation === startingTileRow && currentPlayer.colLocation === startingTileCol && currentPlayer.gold >= 25) {
                    document.getElementById('win').play();
                    $('#message').html('You win!').show();
                }
                $('#'+currentPlayer.rowLocation + "-" + currentPlayer.colLocation).html("<img src=" + currentPlayer.image + ">");
                clearClickableSettings();
                setOnclickSettings();
                $('#deck').click(stageTiles);
            }
            break;
    }
    let chest = false;
    switch (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem) {
        case("bread"):
            currentPlayer.hp += 1;
            break;
        case("key"):
            currentPlayer.keys += 1;
            break;
        case("chest"):
            if(currentPlayer.keys > 0){
                currentPlayer.keys -= 1;
                currentPlayer.gold += 5;
            }else{
                chest = true;
            }

            break;
        case("sword"):
            currentPlayer.attack += 1;
            currentPlayer.hasSword = true;
            //
            break;
        default:
            break;
    }
    updateStats();
    if(!chest) currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem = "";
    currentConnectedTiles = [];
    getSurroundingTiles();
}