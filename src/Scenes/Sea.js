class Sea extends Phaser.Scene {
    constructor() {
        super("sea");
        this.my = {sprite: {}, text: {}};

        this.playerX_OG = 100;
        this.playerY_OG = game.config.height / 2;

        this.shipScale = 0.6;
    }

    preload() {
        this.load.setPath("./assets/");

        // Sprites
        this.load.atlasXML("pirateMisc", "piratePack_ships_spritesheet.png", "piratePack_ships_spritesheet.xml");
        this.load.atlasXML("tanks", "tanks_spritesheet.png", "tanks_spritesheet.xml");
        this.load.image("skullCrossbones", "skull_crossbones.png");

        this.load.image("pirateTiles", "piratePack_tilesheet.png");
        this.load.tilemapTiledJSON("map", "PirateerSeaMap.json")

        // Sound Effects
        this.load.audio("cannonFire", "cannonFire.mp3");
        this.load.audio("playerHit", "woodSmash_0.mp3");
        this.load.audio("shipSunk", "woodSmash_1.mp3");
        this.load.audio("enemyHit", "woodSmash_2.mp3");
        this.load.audio("waterRush", "waterRush_0.mp3");
        this.load.audio("windAmbience", "windAmbience_0.mp3");

        // Music
        this.load.audio("PirateCrew", "PirateCrew_RossBugden.mp3");

        // Text
        this.load.bitmapFont("BlackChancery", "bitmapBlackChancery_0.png", "bitmapBlackChancery_0.fnt");
    }

    create(){
        // Ambient audio + music
        const waterRush = this.sound.add("waterRush");
        const windAmbience = this.sound.add("windAmbience");
        const music = this.sound.add("PirateCrew");

        waterRush.play({loop: true, volume: 0.5});
        windAmbience.play({loop: true, volume: 0.5});
        music.play({loop: true, volume: 0.5});

        // Tilemap
        this.map = this.add.tilemap("map", 30, 30, 40, 20);
        this.tileset = this.map.addTilesetImage("pirateer-sea", "pirateTiles");

        this.layerSeaBase = this.map.createLayer("Sea-Base", this.tileset, 0, 0);
        this.layerSeaWaves = this.map.createLayer("Sea-Waves", this.tileset, 0, 0);

        // Sea scene variables
        let my = this.my;
        my.sprite.shipTemplate = this.add.sprite(-100, -100, "pirateMisc", "ship (1).png");
        my.sprite.shipTemplate.visible = false;
        my.sprite.healthTemplate = this.add.sprite(-100, -100, "skullCrossbones").setScale(0.05);

        this.score = 0, this.wave = 1;

        my.sprite.playerHP = [];

        my.sprite.shots = [];
        this.maxShots = 12, this.reload = 36, this.reloadTimer = 0;

        my.sprite.enemies = [];
        // this.maxEnemies & this.enemiesDeployed decremented immediately b/c incremented before first wave
        this.maxEnemies = 9 + 3 /*+ maxWaves*/, this.enemyCooldown = 144, this.enemyTimer = 0, this.enemiesDeployed = --this.maxEnemies;

        // ENEMY CREATION
        this.createEnemies(my.sprite.shipTemplate);
        
        // PLAYER CREATION
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        my.sprite.pirateShip = new PlayerShip(this, this.playerX_OG, this.playerY_OG, keyW, keyS).setScale(this.shipScale).setAngle(270);

        // Pirate Ship Cannon Shots
        for(let i = 0; i < this.maxShots; i++){
            my.sprite.shots.push(new Shot(this, -100, -100));
        }

        // Pirate Ship Gun Smoke
        this.anims.create({
            key: "gunSmoke",
            frames: [
                {key: "pirateMisc", frame: "explosion3.png"},
                {key: "pirateMisc", frame: "explosion2.png"},
                {key: "pirateMisc", frame: "explosion1.png"},
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

        // Pirate Ship Hit Smoke
        this.anims.create({
            key: "hitSmoke",
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

        // Pirate Ship Health
        for(let i = 0; i < my.sprite.pirateShip.hp / my.sprite.shots[0].shotDmg; i++){
            my.sprite.playerHP.push(this.add.sprite((i+1)*(my.sprite.healthTemplate.displayWidth*1.5), my.sprite.healthTemplate.displayHeight, "skullCrossbones").setScale(0.05));
        }

        // Score
        my.text.score = this.add.bitmapText(game.config.width * 3/4, my.sprite.healthTemplate.displayHeight, "BlackChancery", "Score: " + this.score).setBlendMode(Phaser.BlendModes.ADD);
    }

    update(){
        let my = this.my;

        // PLAYER UPDATES
        let player = my.sprite.pirateShip;
        // Cannon Fire
        if(!player.destroyed && this.reloadTimer-- <= 0 && this.keySpace.isDown) {
            for(let shot of my.sprite.shots){
                if(!shot.active){
                    shot.x = player.x + (shot.displayWidth / 2);
                    shot.y = player.y;
                    shot.activate();

                    this.reloadTimer = this.reload;
                    break;
                }
            }

            // Gun FX
            this.add.sprite(player.x + (player.displayHeight/3), player.y).setScale(0.6).play("gunSmoke");
            this.sound.play("cannonFire", {volume: 0.6});
        }

        // Player Health Bar
        for(let i = my.sprite.playerHP.length-1; i >= 0; i--){
            if(i*my.sprite.shots[0].shotDmg+1 > player.hp){
                my.sprite.playerHP[i].visible = false;
            }
        }

        player.update();

        // Player Shot Updates
        for(let shot of my.sprite.shots){
            shot.update();
        }

        // ENEMY UPDATES + COLLISIONS
        for(let ship of my.sprite.enemies){
            ship.update();

            // Player Shots Collision
            for(let shot of my.sprite.shots){
                if(!ship.destroyed && this.collides(ship, shot)){
                    ship.hp -= shot.shotDmg;
                    shot.deactivate();

                    // FX
                    this.add.sprite(shot.x, shot.y).setScale(0.6).play("hitSmoke");

                    if(ship.hp <= 0){
                        this.sound.play("shipSunk");
                        this.add.sprite(ship.x, ship.y).play("gunSmoke");
                        this.updateScore(ship.points);
                    }else{
                        this.sound.play("enemyHit");
                    }
                }
            }

            // Enemy Ships Collision
            if(!player.destroyed && this.collides(ship, player)){
                ship.hp = 0;
                player.hp = 0;

                // FX
                this.add.sprite(ship.x, ship.y).play("hitSmoke");
                this.updateScore(ship.points);

                this.add.sprite(player.x, player.y).play("gunSmoke");

                this.sound.play("playerHit");
                this.sound.play("shipSunk");
            }

            // Enemy Shots
            if (!player.destroyed && !ship.destroyed && ship.reloadTimer-- <= 0 && ship.active){
                for(let shot of ship.shots){
                    if(!shot.active){
                        shot.x = ship.x - (shot.displayWidth / 2);
                        shot.y = ship.y;
                        shot.activate();
                        break;
                    }
                }

                ship.reloadTimer = ship.reload + this.randRange(0, ship.reload / 10);
                
                // FX
                this.add.sprite(ship.x - (ship.displayHeight/3), ship.y).setScale(0.6).play("gunSmoke");
                this.sound.play("cannonFire", {volume: 0.3});
            }

            // Enemy Shots Update & Collision
            for(let shot of ship.shots){
                shot.update();

                if(!player.destroyed && this.collides(player, shot)){
                    player.hp -= shot.shotDmg;
                    shot.deactivate();

                    // FX
                    this.add.sprite(shot.x, shot.y).setScale(0.6).play("hitSmoke");

                    if(player.hp <= 0){
                        this.sound.play("shipSunk");
                        this.add.sprite(ship.x, ship.y).play("gunSmoke");
                    }else{
                        this.sound.play("playerHit");
                    }
                }
            }
        }

        // WAVES
        if(this.enemiesDeployed >= this.maxEnemies && this.wave <= maxWaves && !player.destroyed){
            // Check if all enemies have been destroyed
            let waveEnd = true;

            for(let ship of my.sprite.enemies){
                if(ship.active){
                    waveEnd = false;
                }
            }

            // Deploy Wave
            if(waveEnd){
                this.enemiesDeployed = 0, this.maxEnemies++, this.wave++;
                
                for(let ship of my.sprite.enemies){
                    ship.deactivate();

                    let rx = game.config.width + player.displayHeight / 2 + this.randRange(0, game.config.width / 8);
                    let ry = this.randRange(player.displayWidth, game.config.height - player.displayWidth);

                    let type = shipTypes[this.randRange(0, shipTypes.length-1)];

                    ship.reset(rx, ry, type);
                }
                
                this.createEnemies(my.sprite.shipTemplate);
            }
        }

        // Deploy Enemy
        if(--this.enemyTimer <= 0 && this.enemiesDeployed < this.maxEnemies){
            my.sprite.enemies[this.enemiesDeployed++].activate();
            this.enemyTimer = this.enemyCooldown;
        }

        // GAME END (Player destruction)
        if(player.destroyed){
            if(my.text.score.visible){
                if(this.score > hiScore) hiScore = this.score;

                my.text.endText = this.add.bitmapText(
                    my.sprite.healthTemplate.displayWidth*2,
                    my.sprite.healthTemplate.displayHeight,
                    "BlackChancery",
                    "Your ship has been sunk!\nFinal Score: " + this.score + "\nHigh Score: " + hiScore + "\n[ P ] to play again").setBlendMode(Phaser.BlendModes.ADD).setScale(1.2);
                my.text.score.visible = false;
            }
            
            if(Phaser.Input.Keyboard.JustDown(this.keyP)){
                this.scene.start("sea");
            }
        }

    } // End update()

    // HELPER FUNCTIONS
    createEnemies(shipTemplate){
        let my = this.my;
        for (let i=my.sprite.enemies.length; i<this.maxEnemies; i++){
            let rx = game.config.width + shipTemplate.displayHeight / 2 + this.randRange(0, game.config.width / 8);
            let ry = this.randRange(shipTemplate.displayWidth, game.config.height - shipTemplate.displayWidth);

            let type = shipTypes[this.randRange(0, shipTypes.length-1)];

            my.sprite.enemies.push(new EnemyShip(this, rx, ry, type).setScale(this.shipScale).setAngle(90));
        }
    }

    randRange(min, max){
        return Math.round(Math.random() * (max - min) + min);
    }

    collides(a, b){
        if(Math.abs(a.x - b.x) > (a.displayHeight*2/5 + b.displayHeight*2/5)) return false;
        if(Math.abs(a.y - b.y) > (a.displayWidth*2/5 + b.displayWidth*2/5)) return false;

        return true;
    }

    updateScore(points){
        if(!points) console.log("Failed to update score, points value not passed.");

        let my = this.my;
        this.score += points;
        my.text.score.setText("Score: " + this.score);
    }
}