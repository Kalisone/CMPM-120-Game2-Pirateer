class Sea extends Phaser.Scene {
    constructor() {
        super("sea"); // super({ key: 'Sea' });
        this.my = {sprite: {}, text: {}};

        this.playerX_OG = 100;
        this.playerY_OG = game.config.height / 2;

        this.score = 0;
    }

    preload() {
        this.load.setPath("./assets/");

        // Sprites
        this.load.atlasXML("pirateMisc", "piratePack_ships_spritesheet.png", "piratePack_ships_spritesheet.xml");
        this.load.atlasXML("uiAdventure", "ui_adventure_spritesheet.png", "ui_adventure_spritesheet.xml");
        this.load.atlasXML("tanks", "tanks_spritesheet.png", "tanks_spritesheet.xml");
        // this.load.image("pirateTiles", "piratePack_tilesheet"); // tiles

        // Sound Effects
        this.load.audio("cannonFire", "cannonFire.mp3");
        this.load.audio("woodSmash_0", "woodSmash_0.mp3");
        this.load.audio("woodSmash_1", "woodSmash_1.mp3");
        this.load.audio("woodSmash_2", "woodSmash_2.mp3");
        this.load.audio("waterRush", "waterRush_0.mp3");
        this.load.audio("windAmbience", "windAmbience_0.mp3");

        // Music
        this.load.audio("PirateCrew", "PirateCrew_RossBugden.mp3");

        // Font
        //this.load.bitmapFont();
    }

    create(){
        // Ambient audio + music
        const waterRush = this.sound.add("waterRush");
        const windAmbience = this.sound.add("windAmbience");
        const music = this.sound.add("PirateCrew");

        waterRush.play({loop: true, volume: 0.5});
        windAmbience.play({loop: true, volume: 0.5});
        //music.play({loop: true, volume: 0.5});

        // Sea scene variables
        let my = this.my;

        my.sprite.shots = [];
        this.maxShots = 12, this.reload = 36, this.reloadCounter = 0;

        my.sprite.enemies = [];
        this.maxEnemies = 12;
        my.sprite.cannonShots = [], my.sprite.cannonSmoke = [];
        
        // PLAYER
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.pirateShip = new PlayerShip(this, this.playerX_OG, this.playerY_OG, keyW, keyS).setScale(0.6).setAngle(270);

        // Pirate Ship Cannon Shots
        for(let i = 0; i < this.maxShots; i++){
            my.sprite.cannonShots.push(new Shot(this, -100, -100));
            /*
            my.sprite.cannonShots.push(this.add.sprite(-100, -100, "pirateMisc", "cannonBall.png"));
            my.sprite.cannonShots[i].visible = false;*/
        }

        // Pirate Ship Cannon Smoke
        this.anims.create({
            key: "cannonSmoke",
            frames: [
                {key: "tanks", frame: "smokeYellow3.png"},
                {key: "tanks", frame: "smokeOrange3.png"},
                {key: "tanks", frame: "smokeWhite2.png"},
                {key: "tanks", frame: "smokeGrey3.png"},
                {key: "tanks", frame: "smokeWhite1.png"},
                {key: "tanks", frame: "smokeGrey2.png"},
                {key: "tanks", frame: "smokeWhite0.png"},
                {key: "tanks", frame: "smokeGrey1.png"}
            ],
            frameRate: 45,
            hideOnComplete: true
        });

        // New enemy for testing
        my.sprite.enemyShip = new EnemyShip(this, 200, 200, 6).setScale(0.6).setAngle(90);
        my.sprite.enemyShip.x = game.config.width + my.sprite.enemyShip.displayHeight/2;
    }

    update(){
        let my = this.my;

        // Fire Cannon
        if(this.reloadCounter-- <= 0 && this.keySpace.isDown) {
            let offsetX = 8;

            for(let shot of my.sprite.cannonShots){
                if(!shot.active){
                    console.log(shot.active, shot.visible, shot.direction, shot.shotSpeed, shot.x, shot.y);
                    shot.x = my.sprite.pirateShip.x + (shot.displayWidth / 2) + offsetX;
                    shot.y = my.sprite.pirateShip.y;
                    shot.activate()

                    this.reloadCounter = this.reload;
                    console.log(shot.active, shot.visible, shot.direction, shot.shotSpeed, shot.x, shot.y);
                    break;
                }
            }

            this.add.sprite(my.sprite.pirateShip.x + (my.sprite.pirateShip.displayHeight/2), my.sprite.pirateShip.y, "smokeWhite5.png").setScale(0.6).play("cannonSmoke");

            this.sound.play("cannonFire");
        }

        // Move Shots
        /*
        for(let shot of my.sprite.cannonShots) {
            if(shot.visible){
                shot.update();
                //shot.x += 12;
            }

            if(shot.x > game.config.width) {
                //shot.deactivate();
                shot.visible = false;
            }
        }
            */

        for(let shot of my.sprite.cannonShots){
            shot.update();
        }

        my.sprite.enemyShip.update();
        my.sprite.pirateShip.update();
    }
}