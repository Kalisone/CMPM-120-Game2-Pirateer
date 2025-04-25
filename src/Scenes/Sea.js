class Sea extends Phaser.Scene {
    constructor() {
        super("sea"); // super({ key: 'Sea' });
        this.my = {sprite: {}};

        this.originX = game.config.width / 12;
        this.originY = game.config.height / 2;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.atlasXML("pirateMisc", "piratePack_ships_spritesheet.png", "piratePack_ships_spritesheet.xml");
        this.load.atlasXML("uiAdventure", "ui_adventure_spritesheet", "ui_adventure_spritesheet.xml");
        // this.load.image("pirateTiles", "piratePack_tilesheet"); // tiles
    }

    create(){
        let my = this.my;

        my.sprite.pirateShip = this.add.sprite(this.originX, this.originY, "pirateMisc", "ship (2).png").setScale(0.5).setAngle(270);

        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        let my = this.my;
        let pirateSpeed = 5;

        if((this.keyUp.isDown || this.keyW.isDown && !(this.keyDown.isDown || this.keyS.isDown))) {
            my.sprite.pirateShip.y -= pirateSpeed;
        }

        if(this.keyDown.isDown || this.keyS.isDown && !(this.keyUp.isDown || this.keyW.isDown)) {
            my.sprite.pirateShip.y += pirateSpeed;
        }
    }
}