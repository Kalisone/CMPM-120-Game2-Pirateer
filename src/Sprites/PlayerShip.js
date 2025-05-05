class PlayerShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, keyUp, keyDown, speed, frame, texture) {
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "ship (3).png";

        super(scene, x, y, texture, frame);
        
        this.keyUp = keyUp, this.keyDown = keyDown;
        this.shipSpeed = speed;

        scene.add.existing(this);
        return this;
    }

    update(){
        if(this.keyUp.isDown){
            if(this.y > this.displayWidth/2){
                this.y -= this.shipSpeed;
            }
        }

        if(this.keyDown.isDown){
            if(this.y < (game.config.width - (this.displayWidth/2))){
                this.y == this.shipSpeed;
            }
        }
    }
}