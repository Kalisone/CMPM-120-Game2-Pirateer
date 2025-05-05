var maxWaves = 3;

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

        this.wave = 1;

        my.sprite.shots = [];
        this.maxShots = 12, this.reload = 36, this.reloadTimer = 0;

        my.sprite.enemies = [];
        this.maxEnemies = 12, this.enemyCooldown = 108, this.enemyTimer = 0;
        
        // PLAYER CREATION
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.pirateShip = new PlayerShip(this, this.playerX_OG, this.playerY_OG, keyW, keyS).setScale(0.6).setAngle(270);

        // Pirate Ship Cannon Shots
        for(let i = 0; i < this.maxShots; i++){
            my.sprite.shots.push(new Shot(this, -100, -100));
        }

        // Pirate Ship Gun Smoke
        this.anims.create({
            key: "gunSmoke",
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

        // ENEMY CREATION
        for (let i=0; i<this.maxEnemies; i++){
            let rx = game.config.width+100, ry = this.randRange(game.config.height/6, game.config.height*5/6);
            
            // ~{20% White Marks, 33% Red Crosses, 75% Green Swords, 75% Blue Cavaliers, 33% Yellow Marks}
            let type = [1, 1, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6];
            type = type[this.randRange(0, type.length-1)]

            my.sprite.enemies.push(new EnemyShip(this, rx-500, ry, type).setScale(0.6).setAngle(90));
        }
    }

    update(){
        let my = this.my;

        // PIRATE UPDATES
        // Cannon Fire
        if(this.reloadTimer-- <= 0 && this.keySpace.isDown) {
            for(let shot of my.sprite.shots){
                if(!shot.active){
                    shot.x = my.sprite.pirateShip.x + (shot.displayWidth / 2);
                    shot.y = my.sprite.pirateShip.y;
                    shot.activate()

                    this.reloadTimer = this.reload;
                    break;
                }
            }

            // Gun Smoke
            this.add.sprite(my.sprite.pirateShip.x + (my.sprite.pirateShip.displayHeight/3), my.sprite.pirateShip.y, "smokeWhite5.png").setScale(0.6).play("gunSmoke");

            this.sound.play("cannonFire");
        }

        // Shot Updates
        for(let shot of my.sprite.shots){
            shot.update();
        }

        my.sprite.pirateShip.update();

        // ENEMY UPDATES
        for(let ship of my.sprite.enemies){
            if(ship.active){
                //ship.update();
            }
        }

        // WAVES
        if(this.wave <= maxWaves){
            if(this.enemyTimer-- <= 0){
                for(let ship of my.sprite.enemies){
                    if(!ship.active){
                        ship.activate();

                        this.enemyTimer = this.enemyCooldown;
                    }
                }
            }
        }
    }

    // HELPER FUNCTIONS
    randRange(min, max){
        return Math.round(Math.random() * (max - min) + min);
    }
}