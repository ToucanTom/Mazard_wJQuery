function populatePlayerOptions(){
    console.log("select race was called");
    let playerOptions = Object.keys(playerObjects);
    let ids = ["playerOption1Stats","playerOption2Stats","playerOption3Stats"];
    $('.playerOptions').each(function(index){
    $(this).html("<img class = 'image' src ="+ playerObjects[playerOptions[index]].image + "><div class = 'overlay'  ><div id="+ids[index]+"></div></div>");
    });
    genStats();
}
function genStats(){
    let playerOptions = Object.keys(playerObjects);
    let $statsLocations = [$('#playerOption1Stats'),$('#playerOption2Stats'),$('#playerOption3Stats')];
    let statOptions = Object.keys(playerObjects["Human"]);
    for(let i = 0;i<$statsLocations.length;i++){
        let html = "";
        for(let j = 0;j<4;j++){
            html += "<p>"+statOptions[j+1] + ":"+ playerObjects[playerOptions[i]][statOptions[j+1]]+"</p>";
        }
        $statsLocations[i].html(html);
    }
}
function choosePlayer(playerChoice) {
    console.log("choosePlayer was called");
    currentPlayer.race = playerChoice.race;
    currentPlayer.image = playerChoice.image;
    currentPlayer.attack = playerChoice.attack;
    currentPlayer.armor = playerChoice.armor;
    currentPlayer.hp = playerChoice.hp;
    $("#playerSelect").hide();
    $('#'+currentPlayer.rowLocation+"-"+currentPlayer.colLocation).html("<img src = "+ currentPlayer.image+">");
    $('#deck').click(stageTiles);
    updateStats();
}