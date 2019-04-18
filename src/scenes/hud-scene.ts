/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooters: HUD Scene
 * @license      Digitsensitive
 */

export class HUDScene extends Phaser.Scene {
  private healthBar: Phaser.GameObjects.Image;
  private healthBarColor: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "HUDScene"
    });
  }

  init(): void {}

  create(): void {
    this.healthBar = this.add.image(15, 15, "health-bar").setOrigin(0);
    this.healthBarColor = this.add
      .image(24, 22, "health-bar-color")
      .setOrigin(0);
  }
}
