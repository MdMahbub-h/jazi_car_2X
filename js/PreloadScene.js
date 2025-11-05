class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    // Load images
    this.load.image("bg", "assets/car/bg.png");
    this.load.image("ic_jazi_car", "assets/car/ic_jazi_car.png");
    this.load.image("ic_blocker_1", "assets/car/ic_blocker_1.png");
    this.load.image("ic_blocker_2", "assets/car/ic_blocker_2.png");
    this.load.image("ic_blocker_3", "assets/car/ic_blocker_3.png");
    this.load.image("ic_blocker_4", "assets/car/ic_blocker_4.png");
    this.load.image("ic_blocker_5", "assets/car/ic_blocker_5.png");
    this.load.image("ic_finish_line", "assets/car/ic_finish_line.png");
    this.load.image("ic_trophy", "assets/car/ic_trophy.png");
    this.load.image("btn_yes", "assets/car/btn_yes.png");
    this.load.image("startBtn", "assets/car/startBtn.png");
    this.load.image("ic_close_dialog", "assets/car/ic_close_dialog.png");
    this.load.image("common_dialog", "assets/car/common_dialog.png");
    this.load.image("ic_cross", "assets/car/ic_cross.png");
    this.load.image("ic_dialog", "assets/car/ic_dialog.png");
    this.load.image("ic_gift_box", "assets/car/ic_gift_box.png");
    this.load.image("ic_icon", "assets/car/ic_icon.png");
    this.load.image("ic_clock", "assets/car/ic_clock.png");
    this.load.image("blurBg", "assets/car/blurBg.png");
    this.load.image("gameOver", "assets/car/gameOver.png");

    this.load.image("timer", "assets/car/timer.png");
    this.load.image("score", "assets/car/score.png");

    this.load.audio("bgaudio", "assets/sounds/bgaudio.mp3");
    this.load.audio("congrats", "assets/sounds/congrats.mp3");

    // Loading bar or progress
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(90, 700, 420, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(100, 710, 400 * value, 30);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }

  create() {
    // Start the next scene
    this.scene.start("StartScene");
  }
}

export default PreloadScene;
