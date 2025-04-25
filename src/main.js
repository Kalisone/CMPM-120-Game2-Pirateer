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
    scene: [Sea]
}

// Global variable to hold sprites
var my = {sprite: {}};

const game = new Phaser.Game(config);
