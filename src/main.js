// Ethan Morelos
// CMPM 120 - Game Development Experience
// Game 2 - Gallery Shooter
// May 5, 2024
//
// Pirateer
//
// An example of putting sprites on the screen using Phaser
// 
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
    width: 1000,
    height: 800,
    scene: [Sea],
    fps: {
        forceSetTimeOut: true,
        target: 30
    }
}

// Global variable to hold sprites
var my = {sprite: {}};

const game = new Phaser.Game(config);
