/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter
 * @license      Digitsensitive
 */

import "phaser";
import VirtualJoyStickPlugin from "./plugins/virtualjoystick/virtualjoystick-plugin.js";

import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "Space Shooter",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  scale: {
    width: 360,
    height: 640,
    zoom: 4,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  type: Phaser.AUTO,
  parent: "app",
  scene: [BootScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  plugins: {
    global: [
      {
        key: "rexVirtualJoyStick",
        plugin: VirtualJoyStickPlugin,
        start: true
      }
    ]
  },
  backgroundColor: "#151a21",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
