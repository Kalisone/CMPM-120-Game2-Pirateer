class PlayerShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyUp, keyW, keyDown, keyS) {
        super(scene, x, y, texture, frame);
        
        this.up = keyUp = keyW;
        this.down = keyDown = keyS;
        this.health = 15;
        this.speed = 5;
        this.setScale(0.6);
        this.setAngle(270);

        scene.add.existing(this);

        return this;
    }

    update() {
        if (this.up.isDown && this.y > (this.displayHeight / 2)) {
            this.y -= this.speed;
        }
        if (this.down.isDown && this.y < (game.config.height - (this.displayHeight / 2)) ) {
            this.y += this.speed;
        }
    }
}