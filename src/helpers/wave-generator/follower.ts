/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Wave Generator: Follower
 * @license      Digitsensitive
 */

import { IFollowerConfig } from "./interfaces/follower-config.interface";

export class Follower {
  private x: number;
  private y: number;
  private verticalOffset: number;
  private horizontalOffset: number;
  private key: string;

  constructor(config: IFollowerConfig) {
    this.x = config.x;
    this.y = config.y;
    this.verticalOffset = config.offsets.vertical;
    this.horizontalOffset = config.offsets.horizontal;
    this.key = config.key;
  }
}
