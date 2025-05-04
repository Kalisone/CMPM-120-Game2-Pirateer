class PlayerShip extends Phaser.GameObject.Sprite{
    constructor(scene, x, y, texture, frame) {
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
    }
}