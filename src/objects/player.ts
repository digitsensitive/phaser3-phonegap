/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter: Player
 * @license      Digitsensitive
 */

export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private currentSpeed: number;
  private maxSpeed: number;
  private joystick: any;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.currentSpeed = 0;
    this.maxSpeed = 300;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initInput(): void {
    this.joystick = this.scene.plugins
      .get("rexVirtualJoyStick")
      .add(this.scene, {
        x: this.scene.sys.canvas.width / 2,
        y: this.scene.sys.canvas.height - 50,
        radius: 50,
        base: this.scene.add.circle(0, 0, 30, 0x888888),
        thumb: this.scene.add.circle(0, 0, 15, 0xcccccc),
        dir: 1
      });

    this.cursors = this.joystick.createCursorKeys();
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(25, 25);
  }

  update(): void {
    this.handleFlying();
  }

  private handleFlying(): void {
    if (
      this.cursors.right.isDown &&
      this.x < this.scene.sys.canvas.width - this.width / 2
    ) {
      if (this.currentSpeed < this.maxSpeed) {
        this.currentSpeed += 40;
      }
      this.body.setVelocityX(this.currentSpeed);
    } else if (this.cursors.left.isDown && this.x > this.width / 2) {
      if (this.currentSpeed < this.maxSpeed) {
        this.currentSpeed += 40;
      }
      this.body.setVelocityX(-this.currentSpeed);
    } else {
      this.body.setVelocityX(0);
      this.currentSpeed = 0;
    }
  }

  public gotHurt() {
    // update lives
    let currentLives = this.scene.registry.get("lives");
    this.scene.registry.set("lives", currentLives - 1);
    this.scene.events.emit("livesChanged");

    // reset position
    this.x = this.scene.sys.canvas.width / 2;
    this.y = this.scene.sys.canvas.height - 40;
  }
}
