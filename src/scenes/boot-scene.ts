/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter: Boot Scene
 * @license      Digitsensitive
 */

import { AnimationHelper } from "../helpers/animation-helper";

export class BootScene extends Phaser.Scene {
  // helpers
  private animationHelperInstance: AnimationHelper;

  // graphics
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x98d687);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      "progress",
      function(value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      "complete",
      function() {
        this.animationHelperInstance = new AnimationHelper(
          this,
          this.cache.json.get("animationJSON")
        );
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load out package
    this.load.pack("preload", "./src/assets/pack.json", "preload");

    // init registry
    this.initRegistry();
  }

  update(): void {
    this.scene.start("HUDScene");
    this.scene.start("GameScene");
    this.scene.bringToTop("HUDScene");
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }

  /**
   * Build-in global game data manager to exchange data between scenes.
   * Here we initialize our variables with a key.
   */
  private initRegistry(): void {
    this.registry.set("points", 0);
  }
}
