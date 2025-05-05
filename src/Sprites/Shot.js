class Shot extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, speed, frame, texture){
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "cannonBall.png";

        super(scene, x, y, texture, frame);

        this.direction = (direction ? direction : 1);
        this.shotSpeed = (speed ? speed : 12);

        this.visible = true, this.active = false;

        return this;
    }

    update(){
        if(this.active){
            // SHOT DIRECTION
            switch(this.direction){
                default:
                case 1: // Left
                    this.x += this.shotSpeed;
                    break;
                case 2: // Right
                    this.x -= this.shotSpeed;
                    break;
                case 3: // Down
                    this.y += this.shotSpeed;
                    break;
                case 4: // Up
                    this.y -= this.shotSpeed;
                    break;
            }
        }

    }

    activate(){
        this.visible = true;
        this.active = true;
    }

    deactivate(){
        this.visible = false;
        this.visible = false;
    }
}