class EnemyShip extends Phaser.GameObjects.Sprite {
    curve;
    
    constructor(scene, x, y, frame, texture, dmg, shotSpeed) {
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = 0;
        
        super(scene, x, y, texture, typeChart[frame][0]);

        this.scene = scene;
        this.y_OG = 0;

        this.shots = [];
        this.maxShots = 12, this.reload = 72, this.reloadTimer = 0;
        this.baseShotDmg = dmg ? dmg : 3;
        this.baseShotSpeed = shotSpeed ? shotSpeed : 12;

        for(let i = 0; i < this.maxShots; i++){
            this.shots.push(new Shot(scene, -100, -100, 2));
        }

        this.reset(x, y, frame);

        scene.add.existing(this);
        return this;
    }

    update(){
        if(this.active){
            // HEALTH
            if(this.hp < this.maxHP && !this.destroyed){ // diegetic health indicator
                let stage = Math.floor((-2 / this.maxHP) * this.hp + 2) + 1;

                this.setFrame(typeChart[this.type][stage]);
            }

            if(this.hp <= 0){
                this.destroyed = true;
                this.shipSpeed = 1;
            }

            // MOVEMENT
            if(this.x > 0 - this.displayHeight/2){
                this.x -= this.shipSpeed;
            }

            if (this.y < this.displayWidth/2) this.y = this.displayWidth / 2;
            if (this.y > game.config.height - (this.displayHeight/2)) this.y = game.config.height - (this.displayWidth/2);
            
            // HANDLE WHEN OFFSCREEN
            if(this.active && this.x < 0 - this.displayHeight/2){
                this.deactivate();
            }

            // PATHING
            if(this.pathfinder && this.type === 2){ // Red Cross
                if(!this.pathActive){
                    this.pathActive = true;

                    this.pathfinder.startFollow({
                        from: 0,
                        to: 1,
                        delay: 0,
                        ease: "Linear",
                        duration: game.config.width * game.config.fps.target
                    });
                }

                this.y = this.pathfinder.y;
            }

            if(this.type === 5){ // Yellow Mark
                this.y = this.y_OG + (game.config.height / 10 * Math.sin(this.x / (game.config.width / 20)));
            }
        }
    }

    reset(x, y, type){
        this.active = false, this.visible = false, this.destroyed = false;
        this.pathfinder = null, this.pathActive = false;

        /* Ship types in base game:
         * [0] {1, 7, 13, 19}: White Flag; 2 lives (6 HP), 1 spd, 1 pt
         * [1] {2, 8, 14, 20}: Pirate Ship; 5 lives (15 HP), 2 spd, 0 pts
         * [2] {3, 9, 15, 21}: Red Cross; 5 lives (15 HP), 2 spd, 3 pts
         * [3] {4, 10, 16, 22}: Green Sword; 1 life (3 HP), 2 spd, 1 pt
         * [4] {5, 11, 17, 23}: Blue Cavalier; 1 life (3 HP), 4 spd, 1 pt
         * [5] {6, 12, 18, 24}: Yellow Mark; 3 lives (9 HP), 2 spd, 2 pts
        **/

        this.x = x, this.y = y, this.type = type;

        for (let shot of this.shots){
            shot.direction = 2;
            shot.shotSpeed = this.baseShotSpeed;
            shot.shotDmg = this.baseShotDmg;
        }

        switch(this.type){
            default:
            case 0: // White Flag
                this.hp = 6;
                this.shipSpeed = 1;
                this.points = 1;
                this.reloadTimer = Infinity;
                break;
            case 1: // Pirate Ship
                this.hp = 15;
                this.shipSpeed = 2;
                this.points = 0;
                break;
            case 2: // Red Cross
                this.hp = 15;
                this.shipSpeed = 2;
                this.points = 5;

                if(!this.pathfinder) this.createPathfinder();

                break;
            case 3: // Green Sword
                this.hp = 3;
                this.shipSpeed = 2;
                this.points = 2;

                for(let shot of this.shots){
                    shot.shotDmg *= 2;
                }
                
                break;
            case 4: // Blue Cavalier
                this.hp = 3;
                this.shipSpeed = 4;
                this.points = 2;

                let directRand = Math.round(Math.random()) + 3;

                for(let shot of this.shots){
                    shot.direction = directRand;
                }

                break;
            case 5: // Yellow Mark
                this.hp = 9;
                this.shipSpeed = 2;
                this.points = 4;
                this.maxDY = 100;

                for(let shot of this.shots){
                    shot.shotSpeed *= 1.25;
                }

                this.y_OG = this.y;

                break;
        }

        this.maxHP = this.hp;

        this.setFrame(typeChart[this.type][0]);
    }

    createPathfinder(){
        let w = game.config.width / 12, h = game.config.height / 6;

        if(Math.round(Math.random()) === 0){
            this.y = game.config.height/6;
            this.points = [
                12*w, 5*h,
                8*w, 4.3*h,
                6*w, 3.8*h,
                3*w, 3*h,
                1.7*w, 2.5*h,
                0.7*w, 2.0*h,
                0.2*w, 1.5*h,
                -0.2*w, 1*h
            ]
        }else{
            this.y = game.config.height*5/6;
            this.points = [
                12*w, 1*h,
                8*w, 1.7*h,
                6*w, 2.2*h,
                3*w, 3*h,
                1.7*w, 3.5*h,
                0.7*w, 4.0*h,
                0.2*w, 4.5*h,
                -0.2*w, 5*h
            ]
        }

        this.curve = new Phaser.Curves.Spline(this.points);

        this.pathfinder = this.scene.add.follower(this.curve, 10, 10, "skullCrossbones").setScale(0.1);
        this.pathfinder.x = this.curve.points[0].x;
        this.pathfinder.y = this.curve.points[0].y;
        this.pathfinder.visible = false;
    }

    activate(){
        this.active = true, this.visible = true, this.destroyed = false;
    }

    deactivate(){
        this.active = false, this.visible = false;
    }
}