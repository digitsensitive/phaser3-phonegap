/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooters: HUD Scene
 * @license      Digitsensitive
 */

export class HUDScene extends Phaser.Scene {
  private healthBar: Phaser.GameObjects.Image;
  private healthBarColor: Phaser.GameObjects.Image;
  private bitmapTexts: Phaser.GameObjects.BitmapText[];

  constructor() {
    super({
      key: "HUDScene"
    });
  }

  init(): void {
    this.bitmapTexts = [];
  }

  create(): void {
    // create bitmap texts
    this.bitmapTexts.push(
      this.add.bitmapText(
        250,
        20,
        "font",
        `Points: ${this.registry.get("points")}`,
        8
      )
    );

    this.healthBar = this.add.image(15, 15, "health-bar").setOrigin(0);
    this.healthBarColor = this.add
      .image(24, 22, "health-bar-color")
      .setOrigin(0);

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("pointsChanged", this.updatePoints, this);
  }

  private updatePoints() {
    this.bitmapTexts[0].setText(`Points: ${this.registry.get("points")}`);
  }
}
