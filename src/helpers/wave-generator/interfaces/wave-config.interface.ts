/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Wave Generator: Wave Config Interface
 * @license      Digitsensitive
 */

import { IFormationConfig } from "./formation-config.interface";

/**
 * The path type is a string and defines the type of the wave.
 * The points is a Vector2 with all the points in the 2D space, who will
 * make up the curve (f.e. [20, 20, 100, 100] will make a curve between
 * the two points (x: 20, y: 20) and (x: 100, y: 100).
 */
export interface IWaveConfig {
  scene: Phaser.Scene;
  type: string;
  formation: IFormationConfig;
}
