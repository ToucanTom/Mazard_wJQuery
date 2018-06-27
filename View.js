//todo create a limit on how long you can go without fighting a monster, and how many you can fight at once
function genGameBoard() {
    $('#newLevel').hide();
    $('#rotateCW').hide();
    $('#setRotate').hide();
    tileCountDown = totalTiles-1;
    let $gameBoard = $('#gameBoard');
    let html = '';

    // Random number generated for random starting location
    let randNum = Math.floor(Math.random()*(gameBoardSize.col-2)) + 1;
    console.log(randNum);
    for (let i = 0; i < gameBoardSize.row; i++) {
        html += "<tr>";
        let temp_array = [];
        for (let j = 0; j < gameBoardSize.col; j++) {

            // Checks to place starting tile in random location on bottom row
            if (i === gameBoardSize.row-1 && j === randNum) {
                html += "<td id =" + i +'-'+ j + " style='background-image: url(" + tileObjects[1].image + ")' ></td>";
                temp_array[j] = {location: i+'-'+j, droppedItem: "", connected: false, hasFoe: false, foe: {}, staged: false, blocked: false, available: false, t_object: {image: tileObjects[1].image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
                startingTileRow = i;
                startingTileCol = j;
            }
            else {
                html += "<td id =" + i +'-'+ j + " style='background-image: url(" + tileObjects[0].image + ")' ></td>";
                temp_array[j] = {location: i+'-'+j, droppedItem: "", connected: false, hasFoe: false, foe: {}, staged: false, blocked: false, available: true, t_object: {image: tileObjects[0].image, north: false, east: false, south: false, west: false}};
            }
            // ****** IF YOU CHANGED THE CREATION OF THE GAME BOARD, UPDATE IN Model.js ******
        }
        html += "</td>";
        currentGameBoard[i] = temp_array;
    }
    $gameBoard.html(html);
    $("#currentLevel").html( "Level " + currentLevel);
    if (currentLevel === 1) {
        populatePlayerOptions();
    }
    else {
        $('#'+currentPlayer.rowLocation+"-"+currentPlayer.colLocation).html( "<img src = "+currentPlayer.image+">");
        $("#deck").click(stageTiles);
    }

}
function getSurroundingTiles(){
    let tiles = [];
    let counter = 0;
    let counter2 = 0;
    let row = currentPlayer.rowLocation;
    let col = currentPlayer.colLocation;

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
    let targets = getSurroundingTiles();
    for (let i = 0; i<targets.length; i++){
        if (targets[i].available) {
            $('#deck').click(stageTiles);
        }
        else if(targets[i].staged) {
            $('#'+ targets[i].location).click(flipTile2);
        } else {
            $('#'+ targets[i].location).click(move);
        }
    }
}
function clearClickableSettings() {
    $('td').click('');
}
function updateStats() {
    //fixme?
    let $option = $('.playerStats');
    $option[0].innerHTML = "<img src = " + currentPlayer.image + ">";
    $option[1].innerHTML = "Health: " + currentPlayer.hp;
    $option[2].innerHTML = "Attack: " + currentPlayer.attack;
    $option[3].innerHTML = "Armor: " + currentPlayer.armor;
    $option[4].style.backgroundImage = "url('Media/key.png')";
    $option[4].style.marginTop= "15px";
    $option[4].style.paddingTop = "35px";
    $option[4].style.paddingLeft = "5px";
    $option[4].innerHTML = currentPlayer.keys;
    $('#gold').html(currentPlayer.gold);
    if(currentPlayer.hasSword) $("#sword").show();

}