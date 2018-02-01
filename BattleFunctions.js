//////////battle functions///////////////////
function battle(foeObject) {
    currentFoe.name = foeObject.name;
    currentFoe.hp = foeObject.hp;
    currentFoe.armor = foeObject.armor;
    currentFoe.attack = foeObject.attack;
    currentFoe.gold = foeObject.gold;
    currentFoe.image = foeObject.image;
    document.getElementById("foeBattleStats").innerHTML ="Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack;//either abstract these two lines to their own functions or create a seperate div display for each stat
    document.getElementById("playerBattleStats").innerHTML ="Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack;
    document.getElementById("message").style.display = "none";
    document.getElementById("newFoe").style.display = "none";
    document.getElementById("battle").style.display = "inline";

    document.getElementById("battleEnemy").style.backgroundImage = "url("+foeObject.image+")";
    document.getElementById("battlePlayer").innerHTML = "<img src = "+currentPlayer.image+">";
    document.getElementById("rollButton").onclick = roll;
    document.getElementById("rollButton").style.display ="inline";
}
function roll() {
    var enemyDieRoll = Math.floor((Math.random()*6) + 1); // Random Number between 1 and 6
    var playerDieRoll = Math.floor((Math.random()*6) + 1);

    document.getElementById("enemyDice").innerHTML = "<img src = " + diceOptions[enemyDieRoll-1].image + ">";
    document.getElementById("playerDice").innerHTML = "<img src = " + diceOptions[playerDieRoll-1].image + ">";
    document.getElementById("battleResult").innerHTML ="";

    if (playerDieRoll > currentFoe.armor) {
        // Hit!
        document.getElementById("battleResult").innerHTML = "Player Hit!";
        currentFoe.hp -= currentPlayer.attack;
        if(currentFoe.hp<1) currentFoe.hp = 0;
        document.getElementById("foeBattleStats").innerHTML ="Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack;
    }
    if(currentFoe.hp <1){
        // Display Exit Battle Button
        document.getElementById("returnButton").style.display = "inline";
        document.getElementById("returnButton").onclick = returnFromBattle;

        // Turn off Roll Button
        //document.getElementById("rollButton").onclick = "";
        document.getElementById("rollButton").style.display ="none";
        document.getElementById("battleResult").innerHTML += "\n\n\nYou beat the " + currentFoe.name + " and claimed " + currentFoe.gold + " gold!";
        currentPlayer.gold += currentFoe.gold;

    }
    else if (enemyDieRoll > currentPlayer.armor) {
        // enemy hit!
        document.getElementById("battleResult").innerHTML += "\n\n\nEnemy Hit...";
        currentPlayer.hp-= currentFoe.attack;
        document.getElementById("playerBattleStats").innerHTML ="Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack;
        if(currentPlayer.hp < 1){
            returnFromBattle();
        }
    }



}
function returnFromBattle() {

    // Clear Return Button, Battle Result Status, and Dice. Return to Game
    document.getElementById("returnButton").onclick = "";
    document.getElementById("returnButton").style.display = "none";
    document.getElementById("battleResult").innerHTML = "";
    document.getElementById("enemyDice").innerHTML = "Enemy's Roll";
    document.getElementById("playerDice").innerHTML = "Player's Roll";
    document.getElementById("battle").style.display = "none";
    // Update Player Stats
    updateStats();

    // check if battle lowered hp to 0
    if (currentPlayer.hp < 1) {
        document.getElementById("message").innerHTML = "You ded foo";
        document.getElementById("message").style.display = "inline";
        immobile = true;
        clearClickableSettings();
        return;
    }

    // this currently stages all tiles around player even if you haven't staged them previously by clicking deck
    stageTiles();
    immobile = false;
}
//////////////////////////