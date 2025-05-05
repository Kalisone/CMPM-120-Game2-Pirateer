class EnemyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame, texture) {
        if(!texture) texture = "pirateMisc";
        let frameNum = (frame ? frame : 1);
        
        super(scene, x, y, texture, `ship (${frameNum}).png`);
        this.type = frame;

        /* Ship types in base game; HP stages = {3, 2, 1, 0}:
         * {1, 7, 13, 19}: White Flag; 2 lives (6 HP), 1 spd, 1 pt
         * {2, 8, 14, 20}: Pirate Ship; 5 lives (15 HP), 2 spd, 0 pts
         * {3, 9, 15, 21}: Red Cross; 5 lives (15 HP), 2 spd, 3 pts
         * {4, 10, 16, 22}: Green Sword; 1 life (3 HP), 2 spd, 1 pt
         * {5, 11, 17, 23}: Blue Cavalier; 1 life (3 HP), 4 spd, 1 pt
         * {6, 12, 18, 24}: Yellow Mark; 3 lives (9 HP), 2 spd, 2 pts
        **/

        switch(this.type){
            default:
            case 1: // White Flag
                this.hp = 6;
                this.shipSpeed = 1;
                this.points = 1;
                break;
            case 2: // Pirate Ship
                this.hp = 15;
                this.shipSpeed = 2;
                this.points = 0;
                break;
            case 3: // Red Cross
                this.hp = 15;
                this.shipSpeed = 2;
                this.points = 3;
                break;
            case 4: // Green Sword
                this.hp = 3;
                this.shipSpeed = 2;
                this.points = 1;
                break;
            case 5: // Blue Cavalier
                this.hp = 3;
                this.shipSpeed = 4;
                this.points = 1;
                break;
            case 6: // Yellow Mark
                this.hp = 9;
                this.shipSpeed = 2;
                this.points = 2;
                break;
        }
        
        this.maxHP = this.hp;
        scene.add.existing(this);
        return this;
    }

    update(){
        // HEALTH
        if(this.hp < this.maxHP){ // diegetic health indicator
            let stage = Math.trunc((-2 / this.maxHP) * this.hp + 2) + 1;
            this.setFrame(`ship (${6 * stage + this.type}).png`);
        }

        if(this.x > 0 - this.displayHeight/2){
            this.x -= this.shipSpeed;
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