class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.setOrigin(0.5, 0.5);
        this.setScale(0.6);
        this.setAngle(90);
        this.health = 15;
    }

    update() {
        this.x -= 2;
    }

    static RedCross = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.setTexture("pirateMisc", "ship (1).png");
        }
    }

    static GreenSwords = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.setTexture("pirateMisc", "ship (2).png");
            this.health = 3;
        }
    }

    static BlueCavalier = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.setTexture("pirateMisc", "ship (3).png");
            this.health = 3;
        }
    }

    static YellowMark = class extends Ship {
        constructor(scene, x, y) {
            super(scene, x, y);
            this.setTexture("pirateMisc", "ship (4).png");
            this.health = 9;
        }
    }
}