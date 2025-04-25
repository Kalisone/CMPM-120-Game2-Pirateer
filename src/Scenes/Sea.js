class Sea extends Phaser.Scene {
    constructor() {
        super("sea"); // super({ key: 'Sea' });
        this.my = {sprite: {}};

        this.originX = 100;
        this.originY = game.config.height / 2;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.atlasXML("pirateMisc", "piratePack_ships_spritesheet.png", "piratePack_ships_spritesheet.xml");
        this.load.atlasXML("uiAdventure", "ui_adventure_spritesheet", "ui_adventure_spritesheet.xml");
        this.load.atlasXML("tanks", "tanks_spritesheet.png", "tanks_spritesheet.xml");
        // this.load.image("pirateTiles", "piratePack_tilesheet"); // tiles

        this.load.audio("cannonFire", "cannonFire.mp3");
        this.load.audio("woodSmash", "woodSmash.mp3");
        this.load.audio("waterRush", "waterRush_0.mp3");
        this.load.audio("windAmbience", "windAmbience_0.mp3");
    }

    create(){
        let my = this.my;
        this.pointer = this.input.activePointer;
        
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        my.sprite.pirateShip = this.add.sprite(this.originX, this.originY, "pirateMisc", "ship (2).png").setScale(0.5).setAngle(270);

        this.input.on('pointerdown', (pointer) => {
            if(pointer.leftButtonDown()) {
                this.add.sprite(my.sprite.pirateShip.x + 50, my.sprite.pirateShip.y, "pirateMisc", "cannonBall.png");
                my.sprite.smoke = this.add.sprite(my.sprite.pirateShip.x + 30, my.sprite.pirateShip.y, "tanks", "smokeWhite5.png").setScale(0.3).setAlpha(0.8);
                
                this.sound.play("cannonFire", {volume: 0.5});
            }
        });

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