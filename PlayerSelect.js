//Player select//////////////////////
function populatePlayerOptions(){
    console.log("select race was called");
    var playerOptions = Object.keys(playerObjects);
    var option = document.getElementsByClassName("playerOptions");
    var ids = ["playerOption1Stats","playerOption2Stats","playerOption3Stats"];
    for(var i = 0; i< option.length; i++){
        option[i].innerHTML = "<img class = 'image' src ="+ playerObjects[playerOptions[i]].image + "><div class = 'overlay'  ><div id="+ids[i]+"></div></div>";
    }
    genStats();
}
function genStats(){  //this puts the character information into the overlay to show the stats of the player option
    var playerOptions = Object.keys(playerObjects);
    var statsLocations = [document.getElementById("playerOption1Stats"),document.getElementById("playerOption2Stats"),document.getElementById("playerOption3Stats")];
    var statOptions = Object.keys(playerObjects["Human"]);
    for(var i = 0;i<statsLocations.length;i++){
        var html = "";
        for(var j = 0;j<4/*number of stats*/;j++){
            html += "<p>"+statOptions[j+1] + ":"+ playerObjects[playerOptions[i]][statOptions[j+1]]+"</p>";
        }
        statsLocations[i].innerHTML = html;
    }

}
function choosePlayer(playerChoice) {
    console.log("choosePlayer was called");
    currentPlayer.race = playerChoice.race;
    currentPlayer.image = playerChoice.image;
    currentPlayer.attack = playerChoice.attack;
    currentPlayer.armor = playerChoice.armor;
    currentPlayer.hp = playerChoice.hp;
    $("#playerSelect").hide(); //remove the player select div
    //todo not sure why my jquery version wont work on the below statement.
    document.getElementById(currentPlayer.rowLocation+","+currentPlayer.colLocation).innerHTML="<img src = "+currentPlayer.image+">";
    $("#deck").click(stageTiles);

    // Visually display characters stats
    updateStats();
}
/////////////////////////////