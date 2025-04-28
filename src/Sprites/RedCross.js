class RedCross extends WhiteMark{
    constructor(scene, x, y, texture, frame) {
        if(!texture) texture = "pirateMisc";
        if(!frame) frame = "ship (3).png";

        super(scene, x, y, texture, frame);

        this.health = 15, this.points = 3, this.speed = 2;
        this.scene = scene;
        scene.add.existing(this);
    }

    create(){
        let my = this.my;
        my.sprite.cannonShots = [], my.sprite.cannonSmoke = [];
        this.maxShots = 3, this.reload = 36, this.reloadCounter = 0;
    }

    update(){
        super.update();
    }
}