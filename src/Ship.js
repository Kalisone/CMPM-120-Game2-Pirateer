class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.setScale(0.6);
        this.setAngle(90);
        this.health, this.points, this.speed;
    }

    update() {
        this.x -= 2;
    }

    // fires 3 shots, curved path
    static RedCross = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.health = 15;
            this.points = 3;
            this.speed = 2;
        }
    }

    // fires heavy shot, straight path
    static GreenSwords = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.health = 3;
            this.points = 1;
            this.speed = 2;
        }
    }

    // fires sideways, faster, straight path
    static BlueCavalier = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.health = 3;
            this.points = 1;
            this.speed = 4;
        }
    }

    // fires single shot, path is sine wave
    static YellowMark = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.health = 9;
            this.points = 2;
            this.speed = 2;
        }
    }

    // unarmed ship, nonmoving target
    static WhiteFlag = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.health = 3;
            this.points = 1;
            this.speed = 1;
        }
    }
}