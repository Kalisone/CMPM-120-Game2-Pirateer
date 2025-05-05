class Sea extends Phaser.Scene {
    constructor() {
        super("sea"); // super({ key: 'Sea' });
        this.my = {sprite: {}};
        my.enemies = [];
        this.maxEnemies = 12;

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
        // Ambient audio + music
        const waterRush = this.sound.add("waterRush");
        const windAmbience = this.sound.add("windAmbience");
        const music = this.sound.add("PirateCrew");

        waterRush.play({loop: true, volume: 0.2});
        windAmbience.play({loop: true, volume: 0.2});
        //music.play({loop: true, volume: 0.2});

        // Sea scene variables
        this.pirateSpeed = 6, this.shotSpeed = 12;

        let my = this.my;
        this.maxShots = 6, this.reload = 36, this.reloadCounter = 0;
        my.sprite.cannonShots = [], my.sprite.cannonSmoke = [];
        
        // Pirate Ship controls
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add Pirate Ship
        my.sprite.pirateShip = this.add.sprite(this.originX, this.originY, "pirateMisc", "ship (2).png").setScale(0.6).setAngle(270);

        // Pirate Ship Cannon Shots
        for(let i = 0; i < this.maxShots; i++){
            my.sprite.cannonShots.push(this.add.sprite(-100, -100, "pirateMisc", "cannonBall.png"));
            my.sprite.cannonShots[i].visible = false;
        }
        
        // Pirate Ship Cannon Smoke
        my.sprite.cannonSmoke.push(this.add.sprite(-100, -100, "tanks", "smokeWhite0.png").setScale(0.4).setAlpha(0.9));
        my.sprite.cannonSmoke[0].visible = false;

        my.sprite.cannonSmoke.push(this.add.sprite(-100, -100, "tanks", "smokeWhite4.png").setScale(0.3).setAlpha(0.7));
        my.sprite.cannonSmoke[1].visible = false;

        my.sprite.cannonSmoke.push(this.add.sprite(-100, -100, "tanks", "smokeWhite5.png").setScale(0.3).setAlpha(0.5));
        my.sprite.cannonSmoke[2].visible = false;

        // New enemy for testing
        my.sprite.enemyShip = new EnemyShip(this, 200, 200, 5).setScale(0.6).setAngle(90);
    }

    update(){
        let my = this.my;

        if(this.keyW.isDown) { // move up
            my.sprite.pirateShip.y -= this.pirateSpeed;
        }

        if(this.keyS.isDown) { // move down
            my.sprite.pirateShip.y += this.pirateSpeed;
        }

        // Fire Cannon
        if(this.reloadCounter-- <= 0 && this.keySpace.isDown) {
            this.offsetX = 8;

            for(let shot of my.sprite.cannonShots){
                if(!shot.visible){
                    shot.x = my.sprite.pirateShip.x + (shot.displayWidth / 2)+ this.offsetX;
                    shot.y = my.sprite.pirateShip.y;
                    shot.visible = true;

                    this.reloadCounter = this.reload;
                    break;
                }
            }

            for(let smoke of my.sprite.cannonSmoke) {
                if(!smoke.visible){
                    smoke.x = my.sprite.pirateShip.x + (smoke.displayWidth / 2) + this.offsetX;
                    smoke.y = my.sprite.pirateShip.y;
                    smoke.visible = true;

                    this.offsetX += smoke.displayWidth / 3;

                    this.tweens.add({
                        targets: smoke,
                        alpha: 0,
                        duration: 600,
                        ease: "Linear",
                        delay: this.offsetX * 5,
                        onComplete: () => {
                            smoke.visible = false;
                            smoke.alpha = 0.9;
                        }
                    });
                }
            }
            this.sound.play("cannonFire", {volume: 0.6});
        }
        
        // Move Shots
        for(let shot of my.sprite.cannonShots) {
            if(shot.visible){
                shot.x += this.shotSpeed;
            }

            if(shot.x > game.config.width) {
                shot.visible = false;
            }
        }

        //my.sprite.enemyShip.update();
    }
}