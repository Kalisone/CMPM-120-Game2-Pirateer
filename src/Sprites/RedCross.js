class RedCross extends WhiteMark{
    constructor(scene, x, y) {
        let texture = "pirateMisc", frame = "ship (3).png";
        super(scene, x, y, texture, frame);
        this.health = 15, this.points = 3, this.speed = 2;
        this.scene = scene;
        scene.add.existing(this);
    }
}