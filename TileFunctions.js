//TODO find a way to abstract item drop logic
function flipTile2(row, col) {
  if (col === undefined) {
    row = this.parentNode.rowIndex;
    col = this.cellIndex;
  }
  currentPlayer.immobile = true;
  console.log('flipTile2 was called');
  let randNum = Math.floor(Math.random() * 100) + 1;
  if (randNum <= 25) {
    randNum = Math.floor(Math.random() * 100) + 1;
    let index = 0;
    if (randNum <= 40) index = 0;
    else if (randNum <= 75) index = 1;
    else index = 2;
    $('#message')
      .show()
      .html('You have encountered a foe!');
    $('#newFoe')
      .css('background-image', 'url(' + foeOptions[index].image + ')')
      .show();
    setTimeout(function() {
      battle(foeOptions[index]);
    }, 2500);
    return;
  }
  tileCountDown--;
  currentGameBoard[row][col].staged = false;
  if (row === currentPlayer.rowLocation - 1) {
    updateGameBoardTileObject(currentTile, selectRandomTile('north'));
  }
  if (col === currentPlayer.colLocation + 1) {
    updateGameBoardTileObject(currentTile, selectRandomTile('east'));
  }
  if (row === currentPlayer.rowLocation + 1) {
    updateGameBoardTileObject(currentTile, selectRandomTile('south'));
  }
  if (col === currentPlayer.colLocation - 1) {
    updateGameBoardTileObject(currentTile, selectRandomTile('west'));
  }
  currentTile.location = row + '-' + col;
  $('#' + row + '-' + col).css(
    'background-image',
    'url(' + currentTile.image + ')'
  );
  genRotateDivs();
  clearClickableSettings();
}
function stageTiles() {
  let setClickableTiles = getSurroundingTiles();
  for (let i = 0; i < setClickableTiles.length; i++) {
    if (setClickableTiles[i].available) {
      $('#' + setClickableTiles[i].location).css(
        'background-image',
        'url(Media/gameDeck.png)'
      );
      currentGameBoard[setClickableTiles[i].location[0]][
        setClickableTiles[i].location[2]
      ].staged = true;
      currentGameBoard[setClickableTiles[i].location[0]][
        setClickableTiles[i].location[2]
      ].available = false;
    }
  }
  $('#deck')
    .click('')
    .empty();
  setOnclickSettings();
}
function genRotateDivs() {
  $('#rotateCW').show();
  $('#setRotate').show();
}
function rotateCW() {
  updateGameBoardTileObject(currentTile, tileObjects[currentTile.rotCW]);
  $('#' + currentTile.location).css(
    'background-image',
    'url(' + currentTile.image + ')'
  );
}
function setRotation() {
  console.log('set roataion');
  $('#rotateCW').hide();
  $('#setRotate').hide();
  updateGameBoardTileObject(
    currentGameBoard[currentTile.location[0]][currentTile.location[2]].t_object,
    currentTile
  );
  currentPlayer.immobile = false;
  let rand = Math.floor(Math.random() * 100 + 1);
  if (items.dropRate >= rand) {
    rand = Math.floor(Math.random() * 100 + 1);
    let targetElement =
      currentGameBoard[currentTile.location[0]][currentTile.location[2]];
    if (rand <= 10 && !currentPlayer.hasSword) {
      $('#' + currentTile.location[0] + '-' + currentTile.location[2]).append(
        '<img src = ' + items.sword.image + '>'
      );
      targetElement.droppedItem = 'sword';
    } else if (rand <= 50) {
      if (rand % 2 === 0) {
        $('#' + currentTile.location[0] + '-' + currentTile.location[2]).append(
          '<img src = ' + items.key.image + '>'
        );
        targetElement.droppedItem = 'key';
      } else {
        $('#' + currentTile.location[0] + '-' + currentTile.location[2]).append(
          '<img src = ' + items.chest.image + '>'
        );
        targetElement.droppedItem = 'chest';
      }
    } else {
      $('#' + currentTile.location[0] + '-' + currentTile.location[2]).append(
        '<img src = ' + items.bread.image + '>'
      );
      targetElement.droppedItem = 'bread';
    }
  }
  setOnclickSettings();
}
