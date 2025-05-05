class EnemyShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame, texture) {
        if(!texture) texture = "pirateMisc";
        if(!frame){
            frame = "ship (1).png"
        }else{
            frame = `ship (${frame}).png`;
        };

        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        return this;
    }

    update(){
        
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