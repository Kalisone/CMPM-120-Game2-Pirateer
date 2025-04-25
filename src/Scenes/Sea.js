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
        this.load.atlasXML("uiAdventure", "ui_adventure_spritesheet.png", "ui_adventure_spritesheet.xml");
        this.load.atlasXML("tanks", "tanks_spritesheet.png", "tanks_spritesheet.xml");
        // this.load.image("pirateTiles", "piratePack_tilesheet"); // tiles

        this.load.audio("cannonFire", "cannonFire.mp3");
        this.load.audio("woodSmash_0", "woodSmash_0.mp3");
        this.load.audio("woodSmash_1", "woodSmash_1.mp3");
        this.load.audio("woodSmash_2", "woodSmash_2.mp3");
        this.load.audio("waterRush", "waterRush_0.mp3");
        this.load.audio("windAmbience", "windAmbience_0.mp3");
        this.load.audio("PirateCrew", "PirateCrew_RossBugden.mp3");
    }

    create(){
        let my = this.my;
        my.sprite.cannonShots = [];
        my.sprite.cannonSmoke = [];
        this.pointer = this.input.activePointer;
        
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        my.sprite.pirateShip = this.add.sprite(this.originX, this.originY, "pirateMisc", "ship (2).png").setScale(0.6).setAngle(270);
        //let pirateTexture = this.textures.get("pirateMisc").get("ship (2).png");
        //my.sprite.pirateShip = new PlayerShip(this, this.originX, this.originY, pirateTexture, null, this.keyW, this.keyS);

        this.cannonFire(my.sprite.cannonShots, my.sprite.cannonSmoke, my.sprite.pirateShip);

        const waterRush = this.sound.add("waterRush");
        const windAmbience = this.sound.add("windAmbience");
        const music = this.sound.add("PirateCrew");

        waterRush.play({loop: true, volume: 0.2});
        windAmbience.play({loop: true, volume: 0.2});
        music.play({loop: true, volume: 0.2});
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

                cannonSmoke.push(this.add.sprite(ship.x + offsetX+12, ship.y, "tanks", "smokeWhite5.png").setScale(0.3).setAlpha(0.5));

                cannonSmoke.push(this.add.sprite(ship.x + offsetX+6, ship.y, "tanks", "smokeWhite4.png").setScale(0.3).setAlpha(0.7));
                
                cannonSmoke.push(this.add.sprite(ship.x + offsetX, ship.y, "tanks", "smokeWhite0.png").setScale(0.4).setAlpha(0.9));

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

        if(this.keyW.isDown) {
            my.sprite.pirateShip.y -= pirateSpeed;
        }

        if(this.keyS.isDown) {
            my.sprite.pirateShip.y += pirateSpeed;
        }
        
        for(let shot of my.sprite.cannonShots) {
            shot.x += cannonShotSpeed;
            if (shot.x > game.config.width) {
                shot.destroy();
            }
        }

        //my.sprite.cannonShots = my.sprite.cannonShots.filter((shot) => shot.x > game.config.width);
/*
        let count = 0;
        for (let shot of my.sprite.cannonShots){
            count++;
        }
        console.log("Shots: " + count);*/
    }
}