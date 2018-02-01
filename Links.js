
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///TODO
//\GENERAL
//  SHOULD ONLY BE ABLE TO FLIP TILES YOU CAN MOVE TO (NO FLIPPING A STAGED TILE ACROSS A WALL)
//  WIN CONDITION = GEMS
//  MAYBE ROOMS = 100% EVENT(ITEMS OR BATTLE GUARANTEED)
//\ITEMS
//  HEALTH
//  OFFENSIVE
//  DEFENSIVE
//  CHESTS/KEYS
//  UTILITY (DOORS, TOLL TROLLS, EQUIPMENT, ETC...)
//\BATTLES
//  IMAGE SHOULD BE THE SAME AS THE ENCOUNTER ON THE MAP
//  HIT AND MISS SHOULD BE BASED ON ARMOR
//  REWARDS FOR BEATING FOES

/* should we create foe locations when we generate grid? should we generate droppedItem drops when we generate grid?
    tiers for items and put higher tier items with more difficult foes.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *      FOR View.js
 *
 *      PRE-GAMEPLAY FUNCTIONS
 *
 * {@link genGameBoard}
 * {@link populatePlayerOptions}
 * {@link genStats}
 * {@link choosePlayer}
 *
 *      GAMEPLAY FUNCTIONS
 *
 * {@link flipTile2}
 * {@link genRotateDivs}
 * {@link rotateCW}
 * {@link rotateCW}
 * {@link setRotation}
 * {@link stageTiles}
 * {@link move}
 * {@link battle}
 * {@link roll}
 * {@link returnFromBattle}
 * {@link move2}
 *
 *      UTILITY FUNCTIONS
 *
 * {@link updateStats}
 * {@link clearClickableSettings}
 * {@link getSurroundingTiles}
 * {@link setOnclickSettings}
 *
 *      FOR Model.js
 *
 * {@link updateGameBoardTileObject}
 * {@link selectRandomTile}
 *
 *
 */
