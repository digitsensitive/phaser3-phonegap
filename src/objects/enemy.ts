/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter: Enemy
 * @license      Digitsensitive
 */

export class Enemy extends Phaser.GameObjects.PathFollower {
  private life: number = 2;
  private verticalOffset: number;
  private horizontalOffset: number;

  constructor(params) {
    super(params.scene, params.path, params.x, params.y, params.key);

    this.verticalOffset = params.offsets.vertical;
    this.horizontalOffset = params.offsets.horizontal;

    this.initPhysics();

    this.startFollow({
      duration: 6500,
      from: 0,
      to: 1,
      rotateToPath: true,
      rotationOffset: 90
    });

    this.pathTween.pause(); //this.pauseFollow();

    this.scene.add.existing(this);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(44, 36);
  }

  update(): void {
    this.clearTint();
    this.setScale(1);
    if (this.verticalOffset > 0) {
      this.verticalOffset--;
    } else {
      this.verticalOffset = 0;
      this.pathTween.resume();
      if (this.y - this.height > this.scene.sys.canvas.height) {
        this.destroy();
      }
    }
  }

  private gotHit(): void {
    var emitter = this.scene.add.particles("spark").createEmitter({
      x: this.x,
      y: this.y,
      blendMode: "SCREEN",
      scale: { start: 0.8, end: 0 },
      speed: { min: -400, max: 400 },
      quantity: 50
    });
    emitter.explode(5, this.x, this.y);
    this.setTint(0xfffd17);
    this.setScale(1.2);
    this.life--;
    if (this.life === 0) {
      this.anims.play("explosion1", true);
      var anim = this.scene.anims.get("explosion1");
      anim.on("complete", function(currentAnim, currentFrame, sprite) {
        sprite.destroy();
      });
    }
  }
}
