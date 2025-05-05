class Shot extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, speed, frame, texture){
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "cannonBall.png";

        super(scene, x, y, texture, frame);

        this.direction = (direction ? direction : 1);
        this.shotSpeed = (speed ? speed : 12);

        this.visible = false, this.active = false;

        scene.add.existing(this);
        return this;
    }

    update(){
        if(this.active){
            // SHOT DIRECTION
            switch(this.direction){
                default:
                case 1: // Left
                    this.x += this.shotSpeed;
                    if(this.x > game.config.width) this.deactivate();
                    break;
                case 2: // Right
                    this.x -= this.shotSpeed;
                    if(this.x < -this.displayWidth/2) this.deactivate();
                    break;
                case 3: // Down
                    this.y += this.shotSpeed;
                    if(this.y > game.config.height + this.displayHeight/2) this.deactivate();
                    break;
                case 4: // Up
                    this.y -= this.shotSpeed;
                    if(this.y < -this.displayHeight/2) this.deactivate();
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
        this.active = false;
    }
}