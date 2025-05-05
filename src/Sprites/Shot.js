class Shot extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, speed, frame, texture){
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "cannonBall.png";

        super(scene, x, y, texture, frame);

        this.direction = (direction ? direction : "W");
        this.shotSpeed = (!speed ? speed : 12);

        this.visible = false, this.active = false;

        return this;
    }

    update(){
        if(this.active){
            if(direction === "E"){
                this.x += this.shotSpeed;
            }else if(direction)
        }

    }
}