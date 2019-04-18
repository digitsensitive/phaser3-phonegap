/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 digitsensitive
 * @description  Space Shooter: Game Scene
 * @license      Digitsensitive
 */

import { Enemy } from "../objects/enemy";
import { Player } from "../objects/player";
import { Star } from "../objects/star";
import { Wave } from "../helpers/wave-generator/wave";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private stars: Phaser.GameObjects.Group;
  private enemies: Phaser.GameObjects.Group;

  private timer: Phaser.Time.TimerEvent;
  private currentWave: number;
  private levelOne: any[] = [
    {
      type: "simpleVertical",
      formationType: "echelonLeft",
      numberOfFollowers: 12,
      numberOfFollowersPerRow: 4,
      vertical: 15,
      horizontal: 75
    },
    {
      type: "simpleHorizontal",
      formationType: "trail",
      numberOfFollowers: 3,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "fromLeftSlope",
      formationType: "trail",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "fromLeftSlope",
      formationType: "block",
      numberOfFollowers: 3,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "simpleHorizontal",
      formationType: "block",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "simpleHorizontal",
      formationType: "block",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "simpleVertical",
      formationType: "block",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "fromLeftSlope",
      formationType: "block",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "simpleVertical",
      formationType: "block",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    },
    {
      type: "simpleVertical",
      formationType: "block",
      numberOfFollowers: 6,
      numberOfFollowersPerRow: 3,
      vertical: 20,
      horizontal: 50
    }
  ];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.currentWave = 0;
    this.stars = this.add.group({
      /*classType: Pipe*/
    });

    this.enemies = this.add.group({
      /*classType: Pipe*/
    });
  }

  create(): void {
    // create game objects
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height - 160,
      key: "player"
    });

    for (let i = 0; i < 100; i++) {
      let star = new Star({
        scene: this,
        x: Phaser.Math.RND.between(0, this.sys.canvas.width),
        y: Phaser.Math.RND.between(-100, this.sys.canvas.height),
        width: Phaser.Math.RND.between(1, 3),
        height: Phaser.Math.RND.between(1, 3),
        fillColor: 0xffffff,
        fillAlpha: Phaser.Math.RND.realInRange(0, 1),
        speed: Phaser.Math.RND.between(1, 5)
      });
      this.stars.add(star);
    }

    // timer
    this.timer = this.time.addEvent({
      delay: 4000,
      callback: this.newWave,
      callbackScope: this,
      loop: true
    });

    this.input.addPointer(2);

    this.physics.add.overlap(
      this.player.getBullets(),
      this.enemies,
      this.handleBulletEnemyOverlap,
      null,
      this
    );
  }

  update(): void {
    this.stars.children.each((star: Star) => {
      star.update();

      if (star.y > this.sys.canvas.height) {
        star.x = Phaser.Math.RND.between(0, this.sys.canvas.width);
        star.y = Phaser.Math.RND.between(-100, this.sys.canvas.height);
      }
    }, this);

    this.enemies.children.each((enemy: Enemy) => {
      if (enemy.active) {
        enemy.update();
      }
    }, this);

    if (this.player.active) {
      this.player.update();
    }
  }

  private newWave(): void {
    if (this.currentWave < this.levelOne.length) {
      let wave;
      wave = new Wave({
        scene: this,
        type: this.levelOne[this.currentWave].type,
        formation: {
          type: this.levelOne[this.currentWave].formationType,
          numberOfFollowers: this.levelOne[this.currentWave].numberOfFollowers,
          numberOfFollowersPerRow: this.levelOne[this.currentWave]
            .numberOfFollowersPerRow,
          offsets: {
            vertical: this.levelOne[this.currentWave].vertical,
            horizontal: this.levelOne[this.currentWave].horizontal
          }
        }
      });

      let followers = wave.getFollowers();

      for (let f of followers) {
        this.enemies.add(
          new Enemy({
            scene: this,
            path: wave.getPath(),
            x: f.x,
            y: f.y,
            key: f.key,
            offsets: {
              vertical: f.verticalOffset,
              horizontal: f.horizontalOffset
            }
          })
        );
      }

      this.currentWave++;
    }
  }

  private handleBulletEnemyOverlap(_b, _e): void {
    _b.destroy();
    if (_e.active) {
      _e.gotHit();
    }
  }
}
