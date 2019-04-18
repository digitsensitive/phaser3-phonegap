/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter: Player
 * @license      Digitsensitive
 */

import { Bullet } from "./bullet";

export class Player extends Phaser.GameObjects.Image {
  private bullets: Phaser.GameObjects.Group;
  private reloadTime: number;

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.bullets = this.scene.add.group({
      runChildUpdate: true
    });
    this.reloadTime = 10;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
    this.setScale(1.2);
    this.setInteractive();
  }

  private initInput(): void {
    this.scene.input.setDraggable(this);
    this.scene.input.on("drag", function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(25, 25);
  }

  update(): void {
    this.handleShooting();
  }

  private handleShooting(): void {
    this.reloadTime--;
    if (this.reloadTime < 0) {
      this.bullets.add(
        new Bullet({
          scene: this.scene,
          x: this.x - this.width / 3,
          y: this.y - this.height,
          key: "bullet",
          bulletProperties: {
            speed: -900
          }
        })
      );
      this.bullets.add(
        new Bullet({
          scene: this.scene,
          x: this.x + this.width / 3,
          y: this.y - this.height,
          key: "bullet",
          bulletProperties: {
            speed: -900
          }
        })
      );
      this.reloadTime = 10;
    }
  }
}
