import { Component, OnDestroy } from '@angular/core';
import Phaser, { AUTO } from 'phaser';

@Component({
  selector: 'app-starfall',
  templateUrl: './starfall.component.html',
  styleUrls: ['./starfall.component.css']
})
export class StarfallComponent implements OnDestroy {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ WelcomeScene, MainScene, ScoreScene ],
      parent: 'gameContainer',
      backgroundColor: '#18216D',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: false
        }
      }
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy(): void {
      this.phaserGame.destroy(true);
  }
}

export class WelcomeScene extends Phaser.Scene {
  title!: Phaser.GameObjects.Text;
  hint!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "WelcomeScene"
    });
  }

  create(): void {
    var titleText: string = "Starfall";
    this.title = this.add.text(150, 200, titleText,
      { font: '128px Arial Bold' });

    var hintText: string = "Click to start";
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold' });

    this.input.on('pointerdown',  (/*pointer*/) => {
      this.scene.start("main");
    }, this);
  }
};




export class MainScene extends Phaser.Scene {
  delta!: number;
  lastStarTime!: number;
  starsCaught!: number;
  starsFallen!: number;
  sand!: Phaser.Physics.Arcade.StaticGroup;
  info!: Phaser.GameObjects.Text;
  background!: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "main"
    });
  }

  init(/*params: any*/): void {
    this.delta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
  }

  preload(): void {
    this.load.setBaseURL("https://raw.githubusercontent.com/mariyadavydova/" +
      "starfall-phaser3-typescript/master/");
    this.load.image("star", "assets/star.png");
    this.load.image("sand", "assets/sand.jpg");
  }

  create(): void {
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });
    Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
      new Phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();
    

    this.info = this.add.text(10, 10, '',
      { font: '24px Arial Bold' });
  }

  override update(time: number): void {
    var diff: number = time - this.lastStarTime;
    if (diff > this.delta) {
      this.lastStarTime = time;
      if (this.delta > 500) {
        this.delta -= 20;
      }
      this.emitStar();
    }
    this.info.text =
      this.starsCaught + " caught - " +
      this.starsFallen + " fallen (max 3)";
  }

  private onClick(star: Phaser.Physics.Arcade.Image): () => void {
    return  () => {
      star.setTint(0x00ff00);
      star.setVelocity(0, 0);
      this.starsCaught += 1;
      this.time.delayedCall(100, function (star: { destroy: () => void; }) {
        star.destroy();
      }, [star], this);
    }
  }

  private onFall(star: Phaser.Physics.Arcade.Image): () => void {
    return  () => {
      star.setTint(0xff0000);
      this.starsFallen += 1;
      this.time.delayedCall(0,  (star: { destroy: () => void; }) => {
        star.destroy();
        if (this.starsFallen > 2) {
          this.scene.start("ScoreScene", { starsCaught: this.starsCaught });
        }
      }, [star], this);
    }
  }

  private emitStar(): void {
    var star: Phaser.Physics.Arcade.Image;
    var x = Phaser.Math.Between(25, 775);
    var y = 26;
    star = this.physics.add.image(x, y, "star");

    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    star.setInteractive();

    star.on('pointerdown', this.onClick(star), this);
    this.physics.add.collider(star, this.sand, this.onFall(star));
  }
};

export class ScoreScene extends Phaser.Scene {
  score!: number;
  result!: Phaser.GameObjects.Text;
  hint!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "ScoreScene"
    });
  }

  init(params: any): void {
    this.score = params.starsCaught;
    // localStorage.setItem("starfall score", this.score.toString());
  }

  create(): void {
    var resultText: string = 'Your score is ' + this.score + '!';
    this.result = this.add.text(200, 250, resultText,
      { font: '48px Arial Bold' });

    var hintText: string = "Click to restart";
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold' });

    this.input.on('pointerdown',  (/*pointer*/) => {
      this.scene.start("WelcomeScene");
    }, this);
  }
};
