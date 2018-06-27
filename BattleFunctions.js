function battle(foeObject) {
    currentFoe.name = foeObject.name;
    currentFoe.hp = foeObject.hp;
    currentFoe.armor = foeObject.armor;
    currentFoe.attack = foeObject.attack;
    currentFoe.gold = foeObject.gold;
    currentFoe.image = foeObject.image;
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
    let enemyDieRoll = Math.floor((Math.random()*6) + 1);
    let playerDieRoll = Math.floor((Math.random()*6) + 1);
    $("#enemyDice").html("<img src = " + diceOptions[enemyDieRoll-1].image + ">");
    $("#playerDice").html("<img src = " + diceOptions[playerDieRoll-1].image + ">");
    $("#battleResult").html("");
    if (playerDieRoll > currentFoe.armor) {
        $("#battleResult").html("Player Hit!");
        currentFoe.hp -= currentPlayer.attack;
        if(currentFoe.hp<1) currentFoe.hp = 0;
        $("#foeBattleStats").html("Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack);
    }
    if(currentFoe.hp <1){
        $("#returnButton").show();
        $("#rollButton").hide();
        $("#battleResult").append("\n\n\nYou beat the " + currentFoe.name + " and claimed " + currentFoe.gold + " gold!");
        currentPlayer.gold += currentFoe.gold;
    }
    else if (enemyDieRoll > currentPlayer.armor) {
        $("#battleResult").append("\n\n\nEnemy Hit...");
        currentPlayer.hp-= currentFoe.attack;
        $("#playerBattleStats").html("Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack);
        if(currentPlayer.hp < 1){
            returnFromBattle();
        }
    }
}
function returnFromBattle() {
    $("#returnButton").hide();
    $("#battleResult").empty();
    $("#enemyDice").html("Enemy's Roll");
    $("#playerDice").html("Player's Roll");
    $("#battle").hide();
    updateStats();
    if (currentPlayer.hp < 1) {
        $("#message").html("You ded foo").show();
        immobile = true;
        clearClickableSettings();
        return;
    }
    stageTiles();
    immobile = false;
}