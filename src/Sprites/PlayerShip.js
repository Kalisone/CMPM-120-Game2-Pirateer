var maxHP = 15;

class PlayerShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, keyUp, keyDown, speed, frame, texture) {
        if(!texture) texture = "pirateMisc";
        if(!frame){
            frame = "ship (2).png"
        }else{
            frame = `ship (${frame}).png`;
        };

        super(scene, x, y, texture, frame);
        
        this.keyUp = keyUp, this.keyDown = keyDown;
        this.shipSpeed = (speed ? speed : 6);

        scene.add.existing(this);
        return this;
    }

    update(){
        // MOVEMENT
        if(this.keyUp.isDown){
            if(this.y > this.displayWidth/2){
                this.y -= this.shipSpeed;
            }
        }

        if(this.keyDown.isDown){
            if(this.y < (game.config.width - (this.displayWidth/2))){
                this.y += this.shipSpeed;
            }
        }

        // HEALTH
        if(this.hp < maxHP){ // visual health update to ship
            this.stage = Math.trunc((3/maxHP) * this.hp) * 6 + 1;
            this.setframe(`ship (${this.stage}).png`);
        }
    }
}