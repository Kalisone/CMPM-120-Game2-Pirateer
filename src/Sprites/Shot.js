class Shot extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, frame, texture){
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "cannonBall.png";

        super(scene, x, y, texture, frame);

        this.direction = direction;
    }
}