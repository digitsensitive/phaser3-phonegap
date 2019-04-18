/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Wave Generator: Follower Config Interface
 * @license      Digitsensitive
 */

export interface IFollowerConfig {
  x: number;
  y: number;
  offsets: {
    vertical: number;
    horizontal?: number;
  };
  key: string;
}
