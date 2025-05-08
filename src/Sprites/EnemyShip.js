class EnemyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame, texture, dmg, shotSpeed) {
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = 0;
        
        super(scene, x, y, texture, typeChart[frame][0]);

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

            if(this.x > 0 - this.displayHeight/2){
                this.x -= this.shipSpeed;
            }
            
            if(this.active && this.x < 0 - this.displayHeight/2){
                this.deactivate();
            }
        }
    }

    reset(x, y, type){
        this.active = false, this.visible = false, this.destroyed = false;

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
                break;
            case 1: // Pirate Ship
                this.hp = 15;
                this.shipSpeed = 2;
                this.points = 0;
                break;
            case 2: // Red Cross
                this.hp = 15;
                this.shipSpeed = 2;
                this.points = 3;
                break;
            case 3: // Green Sword
                this.hp = 3;
                this.shipSpeed = 2;
                this.points = 1;

                for(let shot of this.shots){
                    shot.shotDmg *= 2;
                }
                
                break;
            case 4: // Blue Cavalier
                this.hp = 3;
                this.shipSpeed = 4;
                this.points = 1;

                for(let shot of this.shots){
                    shot.direction = 3;
                }

                break;
            case 5: // Yellow Mark
                this.hp = 9;
                this.shipSpeed = 2;
                this.points = 2;
                this.maxDY = 100;

                for(let shot of this.shots){
                    shot.shotSpeed *= 1.25;
                }

                break;
        }

        this.maxHP = this.hp;

        this.setFrame(typeChart[this.type][0]);
    }

    activate(){
        this.active = true, this.visible = true, this.destroyed = false;
    }

    deactivate(){
        this.active = false, this.visible = false;
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