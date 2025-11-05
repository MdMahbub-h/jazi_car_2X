function showTotalScore(score) {
  console.log("Game Completed");
  console.log("Total Score: " + score);
}
class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  init(data) {
    this.won = data.won;
    this.score = data.score;
    this.finishTime = data.time;
  }

  create() {
    // Background
    this.paused = true;
    this.endMenuItems = [];
    this.blurBg = this.add.image(0, 0, "blurBg").setOrigin(0, 0).setDepth(11);
    this.endMenu = this.add
      .image(300, 450, "gameOver")
      .setOrigin(0.5, 0)
      .setDepth(11)
      .setScale(0.38);
    this.scoreText = this.add
      .text(300, 725, this.score, {
        fontFamily: "Nunito, sans-serif",
        fontStyle: "bold italic",
        fontSize: "45px",
        color: "#ffffff",
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      })
      .setOrigin(0.5)
      .setDepth(11);
    if (this.score > 99999) {
      this.scoreText.setFontSize(30);
    }
    if (this.score > 9999999) {
      this.scoreText.setFontSize(26);
    }
    if (this.score > 999999999) {
      this.scoreText.setFontSize(20);
    }
    this.crossBtnP = this.add
      .image(525, 492, "ic_close_dialog")
      .setOrigin(0.5)
      .setDepth(11)
      .setScale(0.3)
      .setInteractive({ useHandCursor: true });

    this.endMenuItems.push(this.blurBg);
    this.endMenuItems.push(this.endMenu);
    this.endMenuItems.push(this.yesBtn);
    this.endMenuItems.push(this.crossBtnP);

    this.crossBtnP.on("pointerdown", () => {
      this.tweens.add({
        targets: this.crossBtnP,
        scale: 0.25,
        duration: 100,
        ease: "Power1",
        yoyo: true,
        onComplete: () => {
          this.endMenuItems.forEach((item) => {
            if (item) {
              item.destroy();
            }
          });
          showTotalScore(this.score);
          this.endMenuItems = [];
          this.scene.start("StartScene");
        },
      });
    });
  }
}

export default EndScene;
