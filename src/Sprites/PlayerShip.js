class PlayerShip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, keyUp, keyDown, speed, frame, texture) {
        if(!texture) texture = "pirateMisc";
        let type = (frame ? frame : 2);

        super(scene, x, y, texture, `ship (${type}).png`);
        
        this.type = type;
        this.keyUp = keyUp, this.keyDown = keyDown;
        this.shipSpeed = (speed ? speed : 6);
        this.maxHP = this.hp = 15;

        this.active = true, this.visible = true, this.destroyed = false;

        scene.add.existing(this);
        return this;
    }

    update(){
        if(this.active){
            // MOVEMENT
            if(this.keyUp.isDown){ // move up
                if(this.y > this.displayWidth/2){
                    this.y -= this.shipSpeed;
                }
            }

            if(this.keyDown.isDown){ // move down
                if(this.y < (game.config.height - (this.displayWidth/2))){
                    this.y += this.shipSpeed;
                }
            }

            // HEALTH
            if(this.hp < this.maxHP && !this.destroyed){ // diegetic health indicator
                let stage = Math.floor((-2 / this.maxHP) * this.hp + 2) + 1;
                this.setFrame(typeChart[1][stage]);
            }
        }

        if(this.hp <= 0){
            this.destroyed = true;
            this.active = false;
        }
    }
}