// Ethan Morelos
// CMPM 120 - Game Development Experience
// Game 2 - Gallery Shooter
// May 5, 2024
//
// Pirateer
//
// An example of putting sprites on the screen using Phaser
// 
// Favicon: jolly roger by Andrew Cameron from "https://thenounproject.com/browse/icons/term/jolly-roger/", Noun Project (CC BY 3.0)
// Art assets from Kenny Assets
// "Pirate Pack" set: https://kenney.nl/assets/pirate-pack
// "UI Pack - Adventure" set: https://kenney.nl/assets/ui-pack-adventure
//
// Audio assets
//
// Music
// "Pirate Crew" by Ross Bugden: https://www.youtube.com/@RossBugden

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1200,
    height: 600,
    scene: [Sea],
    fps: {
        forceSetTimeOut: true,
        target: 30
    }
}

// Global variables; maxWaves for if future development
var maxWaves = Infinity, hiScore = 0;

const game = new Phaser.Game(config);

const shipTypes = [0, 0, 2, 2, 3, 3, 3, 4, 5, 5];
const typeChart = [
    ["ship (1).png", "ship (7).png", "ship (13).png", "ship (19).png"],
    ["ship (2).png", "ship (8).png", "ship (14).png", "ship (20).png"],
    ["ship (3).png", "ship (9).png", "ship (15).png", "ship (21).png"],
    ["ship (4).png", "ship (10).png", "ship (16).png", "ship (22).png"],
    ["ship (5).png", "ship (11).png", "ship (17).png", "ship (23).png"],
    ["ship (6).png", "ship (12).png", "ship (18).png", "ship (24).png"]
];
