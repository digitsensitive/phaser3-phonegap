/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Wave Generator: Formation Config Interface
 * @license      Digitsensitive
 */

export interface IFormationConfig {
  type: string;
  numberOfFollowers: number;
  numberOfFollowersPerRow?: number;
  offsets: {
    vertical: number;
    horizontal?: number;
  };
}
