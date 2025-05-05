class PlayerShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, keyUp, keyDown, speed, frame, texture) {
        if(!texture) texture = "pirateMisc";
        let type = (frame ? frame : 2);

        super(scene, x, y, texture, `ship (${type}).png`);
        
        this.type = type;
        this.keyUp = keyUp, this.keyDown = keyDown;
        this.shipSpeed = (speed ? speed : 6);
        this.maxHP = this.hp = 15;

        scene.add.existing(this);
        return this;
    }

    update(){
        // MOVEMENT
        if(this.keyUp.isDown){ // move up
            if(this.y > this.displayWidth/2){
                this.y -= this.shipSpeed;
            }
        }

        if(this.keyDown.isDown){ // move up
            if(this.y < (game.config.width - (this.displayWidth/2))){
                this.y += this.shipSpeed;
            }
        }

        // HEALTH
        if(this.hp < this.maxHP){ // diegetic health indicator
            let stage = Math.trunc((-2 / this.maxHP) * this.hp + 2) + 1;
            this.setFrame(`ship (${6 * stage + this.type}).png`);
        }
    }
}