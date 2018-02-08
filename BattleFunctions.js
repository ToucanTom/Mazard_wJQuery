//////////battle functions///////////////////
function battle(foeObject) {
    currentFoe.name = foeObject.name;
    currentFoe.hp = foeObject.hp;
    currentFoe.armor = foeObject.armor;
    currentFoe.attack = foeObject.attack;
    currentFoe.gold = foeObject.gold;
    currentFoe.image = foeObject.image;

    //todo either abstract these two lines to their own functions or create a separate div display for each stat
    $("#foeBattleStats").html("Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack);
    $("#playerBattleStats").html("Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack);

    $("#message").hide();
    $("#newFoe").hide();
    $("#battle").show();
    $("#rollButton").show();

    $("#battleEnemy").css("background-image" , "url("+foeObject.image+")");
    $("#battlePlayer").html( "<img src = "+currentPlayer.image+">");

}
function roll() {
    var enemyDieRoll = Math.floor((Math.random()*6) + 1); // Random Number between 1 and 6
    var playerDieRoll = Math.floor((Math.random()*6) + 1);

    $("#enemyDice").html("<img src = " + diceOptions[enemyDieRoll-1].image + ">");
    $("#playerDice").html("<img src = " + diceOptions[playerDieRoll-1].image + ">");
    $("#battleResult").html("");

    if (playerDieRoll > currentFoe.armor) {
        // Hit!
        $("#battleResult").html("Player Hit!");
        currentFoe.hp -= currentPlayer.attack;
        if(currentFoe.hp<1) currentFoe.hp = 0;
        $("#foeBattleStats").html("Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack);
    }
    if(currentFoe.hp <1){
        // Display Exit Battle Button
        $("#returnButton").show();

        // Turn off Roll Button
        $("#rollButton").hide();
        //todo how do i jquery this??
        document.getElementById("battleResult").innerHTML += "\n\n\nYou beat the " + currentFoe.name + " and claimed " + currentFoe.gold + " gold!";
        currentPlayer.gold += currentFoe.gold;

    }
    else if (enemyDieRoll > currentPlayer.armor) {
        // enemy hit!
        document.getElementById("battleResult").innerHTML += "\n\n\nEnemy Hit...";
        currentPlayer.hp-= currentFoe.attack;
        $("#playerBattleStats").html("Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack);
        if(currentPlayer.hp < 1){
            returnFromBattle();
        }
    }



}
function returnFromBattle() {

    // Clear Return Button, Battle Result Status, and Dice. Return to Game
    $("#returnButton").hide();
    document.getElementById("battleResult").innerHTML = "";
    document.getElementById("enemyDice").innerHTML = "Enemy's Roll";
    document.getElementById("playerDice").innerHTML = "Player's Roll";
    $("#battle").hide();
    // Update Player Stats
    updateStats();

    // check if battle lowered hp to 0
    if (currentPlayer.hp < 1) {
        $("#message").html("You ded foo").show();
        immobile = true;
        clearClickableSettings();
        return;
    }

    // this currently stages all tiles around player even if you haven't staged them previously by clicking deck
    stageTiles();
    immobile = false;
}
//////////////////////////