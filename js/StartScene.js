function exitGame() {
  if (navigator.app) {
    navigator.app.exitApp(); // Android
  } else if (navigator.device) {
    navigator.device.exitApp(); // Legacy Cordova
  } else {
    window.close();
  }
  console.log("Game Exited");
}
class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    // Background
    this.speed = 1;
    this.duration = 60;
    // this.scene.start("GameScene");

    this.scaleBg = 2.6;
    this.bg = this.add
      .tileSprite(300, 650, 600 * this.scaleBg, 1300 * this.scaleBg, "bg")
      .setScale(1 / this.scaleBg);

    // this.pauseMenu();
    //
    this.crossBtn = this.add
      .image(50, 70, "ic_cross")
      .setOrigin(0.5)
      .setDepth(10)
      .setScale(0.3)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.crossBtn,
          scale: 0.26,
          duration: 100,
          ease: "Power1",
          onComplete: () => {
            this.tweens.add({
              targets: this.crossBtn,
              scale: 0.3,
              duration: 100,
              ease: "Power1",
              onComplete: () => {
                this.pauseMenu();
              },
            });
          },
        });
      });

    this.timerBG = this.add
      .image(20, 100, "timer")
      .setOrigin(0, 0)
      .setScale(0.55);
    this.scoreBG = this.add
      .image(580, 100, "score")
      .setOrigin(1, 0)
      .setScale(0.55);

    this.timerText = this.add
      .text(78, 130, "1:00", {
        fontFamily: "Nunito, sans-serif",
        fontStyle: "bold ",
        fontSize: "25px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.scoreText = this.add
      .text(600 - 150, 130, "0", {
        fontFamily: "Nunito, sans-serif",
        fontStyle: "bold ",
        fontSize: "25px",
        color: "#ffffff",
      })
      .setOrigin(0, 0.5);

    this.player = this.physics.add.sprite(250, 950, "ic_jazi_car");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.4).setOrigin(0.5, 0);

    // Play button
    const playButton = this.add
      .image(300, 1150, "startBtn")
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
      .setScale(0.5);

    // Add interactive behavior
    playButton.on("pointerdown", () => {
      // Add a scale bounce tween for press feedback
      this.tweens.add({
        targets: playButton,
        scale: 0.45,
        duration: 100,
        ease: "Power1",
        yoyo: true,
        onComplete: () => {
          this.scene.start("GameScene");
        },
      });
    });

    const fx = playButton.postFX.addShine(0.3, 0.1, 0.2);

    // Optional: hover effect for desktop
    playButton.on("pointerover", () => {
      this.tweens.add({
        targets: playButton,
        scale: 0.52,
        duration: 120,
        ease: "Power2",
      });
    });

    playButton.on("pointerout", () => {
      this.tweens.add({
        targets: playButton,
        scale: 0.5,
        duration: 120,
        ease: "Power2",
      });
    });
  }
  pauseMenu() {
    this.exitMenuItems = [];
    this.blurBg = this.add.image(0, 0, "blurBg").setOrigin(0, 0).setDepth(11);
    this.exitMenu = this.add
      .image(300, 450, "ic_dialog")
      .setOrigin(0.5, 0)
      .setDepth(11)
      .setScale(0.38);
    this.yesBtn = this.add
      .image(300, 720, "btn_yes")
      .setOrigin(0.5)
      .setDepth(11)
      .setScale(0.35)
      .setInteractive({ useHandCursor: true });
    this.crossBtnP = this.add
      .image(530, 492, "ic_close_dialog")
      .setOrigin(0.5)
      .setDepth(11)
      .setScale(0.3)
      .setInteractive({ useHandCursor: true });

    this.exitMenuItems.push(this.blurBg);
    this.exitMenuItems.push(this.exitMenu);
    this.exitMenuItems.push(this.yesBtn);
    this.exitMenuItems.push(this.crossBtnP);

    this.yesBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.yesBtn,
        scale: 0.3,
        duration: 100,
        ease: "Power1",
        yoyo: true,
        onComplete: () => {
          exitGame();
        },
      });
    });
    this.crossBtnP.on("pointerdown", () => {
      this.tweens.add({
        targets: this.crossBtnP,
        scale: 0.25,
        duration: 100,
        ease: "Power1",
        yoyo: true,
        onComplete: () => {
          this.exitMenuItems.forEach((item) => {
            if (item) {
              item.destroy();
            }
          });
          this.exitMenuItems = [];
        },
      });
    });
  }
}

export default StartScene;
