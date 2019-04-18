/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Wave Generator: Wave
 * @license      Digitsensitive
 */

import { Follower } from "./follower";
import { IFormationConfig } from "./interfaces/formation-config.interface";
import { IWaveConfig } from "./interfaces/wave-config.interface";
import { PATHS } from "./data/paths";

/**
 * Every wave has followers.
 * Followers can be different types of enemies and are not defined here.
 *
 * Each wave has specific characteristics.
 * For more details see wave-config.interface.ts.
 */
export class Wave {
  // followers
  private followers: Follower[] = [];

  // basic variables
  private formation: IFormationConfig;
  private pathType: any;

  // spline variables
  private points: any;
  private spline: Phaser.Curves.Spline;

  constructor(config: IWaveConfig) {
    // define basic variables
    this.formation = config.formation;
    this.pathType = config.type;

    // create spline
    this.points = PATHS.find(x => x.type == this.pathType).points;
    this.spline = new Phaser.Curves.Spline(this.points);

    // optional path visualisation
    /*let graphics = config.scene.add.graphics();
    graphics.lineStyle(4, 0xffffff, 0.05);
    graphics.fillStyle(0x00ff00, 20);
    this.spline.draw(graphics, 64);*/

    // create formation
    this.createFormation();
  }

  private createFormation(): void {
    if (this.formation.type === "trail") {
      this.createTrailFormation();
    } else if (this.formation.type === "block") {
      this.createBlockFormation();
    } else if (this.formation.type === "echelonLeft") {
      this.createEchelonLeftFormation();
    }
  }

  private createTrailFormation(): void {
    for (let i = 0; i < this.formation.numberOfFollowers; i++) {
      this.followers.push(
        new Follower({
          x: this.points[0],
          y: this.points[1],
          offsets: {
            vertical: i * this.formation.offsets.vertical,
            horizontal: i * this.formation.offsets.horizontal
          },
          key: "enemy"
        })
      );
    }
  }

  private createBlockFormation(): void {
    // calculate the angle between the first two points on the path (in radians).
    // we need to substract 90° (= 1.5708 Radians) to get the correct angle
    let angle =
      Phaser.Math.Angle.BetweenPoints(
        new Phaser.Geom.Point(this.points[0], this.points[1]),
        new Phaser.Geom.Point(this.points[2], this.points[3])
      ) - 1.5708;

    // loop through all the followers
    for (
      let i = 0;
      i < this.formation.numberOfFollowers;
      i = i + this.formation.numberOfFollowersPerRow
    ) {
      // get number to loop through rows
      let r = (this.formation.numberOfFollowersPerRow - 1) / 2;
      for (let j = -r; j < r + 1; j++) {
        // we need to get to correct point who is in 90° with a distance of
        // offsets.horizontal from the path
        let point = new Phaser.Geom.Point();
        point = Phaser.Math.RotateAround(
          new Phaser.Geom.Point(
            this.points[0] - j * this.formation.offsets.horizontal,
            this.points[1]
          ),
          this.points[0],
          this.points[1],
          angle
        );

        this.followers.push(
          new Follower({
            x: point.x,
            y: point.y,
            offsets: {
              vertical: i * this.formation.offsets.vertical,
              horizontal: i * this.formation.offsets.horizontal
            },
            key: "enemy"
          })
        );
      }
    }
  }

  private createEchelonLeftFormation(): void {
    let angle =
      Phaser.Math.Angle.BetweenPoints(
        new Phaser.Geom.Point(this.points[0], this.points[1]),
        new Phaser.Geom.Point(this.points[2], this.points[3])
      ) - 1.5708;

    for (
      let i = 0;
      i < this.formation.numberOfFollowers;
      i = i + this.formation.numberOfFollowersPerRow
    ) {
      let r = (this.formation.numberOfFollowersPerRow - 1) / 2;
      for (let j = -r; j < r + 1; j++) {
        let point = new Phaser.Geom.Point();
        point = Phaser.Math.RotateAround(
          new Phaser.Geom.Point(
            this.points[0] - j * this.formation.offsets.horizontal,
            this.points[1] - j * 20
          ),
          this.points[0],
          this.points[1],
          angle
        );

        this.followers.push(
          new Follower({
            x: point.x,
            y: point.y,
            offsets: {
              vertical: i * this.formation.offsets.vertical,
              horizontal: i * this.formation.offsets.horizontal
            },
            key: "enemy"
          })
        );
      }
    }
  }

  /**
   * With this function you can get all the followers of the wave.
   * @return [Wave followers]
   */
  public getFollowers(): any[] {
    return this.followers;
  }

  public getPath(): Phaser.Curves.Spline {
    return this.spline;
  }
}
