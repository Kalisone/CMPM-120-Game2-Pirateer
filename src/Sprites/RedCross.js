class RedCross extends WhiteMark{
    constructor(scene, x, y, texture, frame) {
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "ship (3).png";

        super(scene, x, y, texture, frame);

        this.health = 15, this.points = 3, this.speed = 2, this.shotSpeed = 12;
        this.scene = scene;
        this.create();
        scene.add.existing(this);
    }

    create(){
        let my = this.my;
        this.maxShots = 12, this.reload = 36, this.reloadCounter = 0;

        my.sprite.cannonShots = [], my.sprite.cannonSmoke = [];

        // Cannon shots
        for(let i = 0; i < this.maxShots; i++){
            my.sprite.cannonShots.push(this.add.sprite(-100, -100, "pirateMisc", "cannonBall.png"));
            my.sprite.cannonShots[i].visible = false;
        }
        
        // Cannon smoke
        my.sprite.cannonSmoke.push(this.add.sprite(-100, -100, "tanks", "smokeWhite0.png").setScale(0.4).setAlpha(0.9));
        my.sprite.cannonSmoke[0].visible = false;

        my.sprite.cannonSmoke.push(this.add.sprite(-100, -100, "tanks", "smokeWhite4.png").setScale(0.3).setAlpha(0.7));
        my.sprite.cannonSmoke[1].visible = false;

        my.sprite.cannonSmoke.push(this.add.sprite(-100, -100, "tanks", "smokeWhite5.png").setScale(0.3).setAlpha(0.5));
        my.sprite.cannonSmoke[2].visible = false;
    }

    update(){
        let my = this.my;
        // Fire Cannon
        if(this.reloadCounter-- <= 0) {
            this.offsetX = 8;

            for(let shot of my.sprite.cannonShots){
                if(!shot.visible){
                    shot.x = this.x - (shot.displayWidth / 2) - this.offsetX;
                    shot.y = this.y;
                    shot.visible = true;

                    this.reloadCounter = this.reload;
                    break;
                }
            }

            for(let smoke of my.sprite.cannonSmoke) {
                if(!smoke.visible){
                    smoke.x = this.x - (smoke.displayWidth / 2) - this.offsetX;
                    smoke.y = this.y;
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
            }
            this.sound.play("cannonFire", {volume: 0.6, pitch: 1.2});
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
}