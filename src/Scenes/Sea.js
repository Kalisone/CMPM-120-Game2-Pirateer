class Sea extends Phaser.Scene {
    constructor() {
        super("sea"); // super({ key: 'Sea' });
        this.my = {sprite: {}};
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.atlasXML("pirateMisc", "piratePack_ships_spritesheet.png", "piratePack_ships_spritesheet.xml");
        this.load.atlasXML("uiAdventure", "ui_adventure_spritesheet", "ui_adventure_spritesheet.xml");
        // this.load.image("pirateTiles", "piratePack_tilesheet"); // tiles
    }

    create(){
        let my = this.my;
    }

    update(){
        let my = this.my;
        // let pirateSpeed = ;
    }
}