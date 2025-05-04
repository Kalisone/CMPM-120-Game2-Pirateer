class EnemyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        this.shipTextures = {"White Flag": "ship (1)"};
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "ship (3).png";

        super(scene, x, y, texture, frame);
        this.my = {sprite: {}};
        let my = this.my;
        this.scene = scene;

        my.x = x, my.y = y;
        this.health = 15, this.points = 3, this.speed = 2, this.shotSpeed = 12;

        // Create
        this.maxShots = 12, this.reload = 36, this.reloadCounter = 0;

        my.sprite.cannonShots = [], my.sprite.cannonSmoke = [];

        // Cannon shots
        for(let i = 0; i < this.maxShots; i++){
            my.sprite.cannonShots.push(scene.add.sprite(-100, -100, "pirateMisc", "cannonBall.png"));
            my.sprite.cannonShots[i].visible = false;
        }
        
        // Cannon smoke
        my.sprite.cannonSmoke.push(scene.add.sprite(-100, -100, "tanks", "smokeWhite0.png").setScale(0.4).setAlpha(0.9));
        my.sprite.cannonSmoke[0].visible = false;

        my.sprite.cannonSmoke.push(scene.add.sprite(-100, -100, "tanks", "smokeWhite4.png").setScale(0.3).setAlpha(0.7));
        my.sprite.cannonSmoke[1].visible = false;

        my.sprite.cannonSmoke.push(scene.add.sprite(-100, -100, "tanks", "smokeWhite5.png").setScale(0.3).setAlpha(0.5));
        my.sprite.cannonSmoke[2].visible = false;
        
        scene.add.existing(this);
        return this;
    }

    update(){
        let my = this.my;
        // Fire Cannon
        if(this.reloadCounter-- <= 0) {
            this.offsetX = 8;

            for(let shot of my.sprite.cannonShots){
                if(!shot.visible){
                    shot.x = my.x - (shot.displayWidth / 2) - my.offsetX;
                    shot.y = my.y;
                    shot.visible = true;

                    this.reloadCounter = this.reload;
                    break;
                }
            }
/*
            for(let smoke of my.sprite.cannonSmoke) {
                if(!smoke.visible){
                    smoke.x = my.x - (smoke.displayWidth / 2) - this.offsetX;
                    smoke.y = my.y;
                    smoke.visible = true;

                    this.offsetX -= smoke.displayWidth / 3;

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
            }*/
            this.sound.play("cannonFire", {volume: 0.6});
        }
        
        // Move Shots
        for(let shot of my.sprite.cannonShots) {
            if(shot.visible){
                shot.x -= this.shotSpeed;
            }

            if(shot.x < 0) {
                shot.visible = false;
            }
        }
    }

/*
    // fires 3 shots, curved path
    static RedCross = class extends EnemyShip {
        constructor(scene, x, y) {
            super(scene, x, y, this.texture, "ship (3).png");
            this.health = 15;
            this.points = 3;
            this.speed = 2;
        }
    }
/*
    // fires heavy shot, straight path
    static GreenSwords = class extends EnemyShip {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
            this.health = 3;
            this.points = 1;
            this.speed = 2;
        }
    }

    // fires sideways, faster, straight path
    static BlueCavalier = class extends EnemyShip {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
            this.health = 3;
            this.points = 1;
            this.speed = 4;
        }
    }

    // fires single shot, path is sine wave
    static YellowMark = class extends EnemyShip {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
            this.health = 9;
            this.points = 2;
            this.speed = 2;
        }
    }

    // unarmed ship, nonmoving target
    static WhiteFlag = class extends EnemyShip {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
            this.health = 3;
            this.points = 1;
            this.speed = 1;
        }
    }*/
}