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
        this.load.audio("woodSmash_0", "woodSmash.mp3");
        this.load.audio("woodSmash_1", "woodSmash_1.mp3");
        this.load.audio("woodSmash_2", "woodSmash_2.mp3");
        this.load.audio("waterRush", "waterRush_0.mp3");
        this.load.audio("windAmbience", "windAmbience_0.mp3");
    }

    create(){
        let my = this.my;
        this.cannonShots = [];
        this.cannonSmoke = [];
        this.pointer = this.input.activePointer;
        
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        my.sprite.pirateShip = this.add.sprite(this.originX, this.originY, "pirateMisc", "ship (2).png").setScale(0.6).setAngle(270);

        this.cannonFire(this.cannonShots, this.cannonSmoke, my.sprite.pirateShip);

        const waterRush = this.sound.add("waterRush");
        waterRush.play({loop: true, volume: 0.2});
        const windAmbience = this.sound.add("windAmbience");
        windAmbience.play({loop: true, volume: 0.2});
    }

    cannonFire(cannonShots, cannonSmoke, ship){
        if ((cannonShots == undefined) || (cannonSmoke == undefined) ||(ship == undefined)) { return; }

        let offsetX = -30;
        if (ship === this.my.sprite.pirateShip) {
            offsetX *= -1;
        }
        this.input.on('pointerdown', (pointer) => {
            if(pointer.leftButtonDown()) {
                cannonShots.push(this.add.sprite(ship.x + offsetX, ship.y, "pirateMisc", "cannonBall.png"));

                cannonSmoke.push(this.add.sprite(ship.x + offsetX+12, ship.y, "tanks", "smokeWhite5.png").setScale(0.3).setAlpha(0.8));

                cannonSmoke.push(this.add.sprite(ship.x + offsetX+6, ship.y, "tanks", "smokeWhite4.png").setScale(0.3).setAlpha(0.8));
                
                cannonSmoke.push(this.add.sprite(ship.x + offsetX, ship.y, "tanks", "smokeWhite0.png").setScale(0.4).setAlpha(0.8));

                for (let smoke of cannonSmoke) {
                    this.tweens.add({
                        targets: smoke,
                        alpha: 0,
                        duration: 1000,
                        ease: "Linear",
                        onComplete: () => {
                            smoke.destroy();
                        }
                    });
                }
                
                this.sound.play("cannonFire", {volume: 0.5});
            }
        });
    }

    update(){
        let my = this.my;
        let pirateSpeed = 6, cannonShotSpeed = 12;

        if((this.keyUp.isDown || this.keyW.isDown && !(this.keyDown.isDown || this.keyS.isDown))) {
            my.sprite.pirateShip.y -= pirateSpeed;
        }

        if(this.keyDown.isDown || this.keyS.isDown && !(this.keyUp.isDown || this.keyW.isDown)) {
            my.sprite.pirateShip.y += pirateSpeed;
        }
        
        for(let shot of this.cannonShots) {
            shot.x += cannonShotSpeed;
            if (shot.x > game.config.width) {
                shot.destroy();
            }
        }
    }
}