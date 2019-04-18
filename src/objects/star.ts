/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter: Star
 * @license      Digitsensitive
 */

export class Star extends Phaser.GameObjects.Rectangle {
  private speed: number;

  constructor(params) {
    super(
      params.scene,
      params.x,
      params.y,
      params.width,
      params.height,
      params.fillColor,
      params.fillAlpha
    );

    this.speed = params.speed;

    this.scene.add.existing(this);
  }

  update(): void {
    this.y += this.speed;
  }
}
