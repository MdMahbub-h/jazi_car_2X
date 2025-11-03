import PreloadScene from "./PreloadScene.js";
import StartScene from "./StartScene.js";
import GameScene from "./GameScene.js";
import EndScene from "./EndScene.js";

const config = {
  parent: "game",
  type: Phaser.AUTO,
  width: 600,
  height: 1300,

  border: 2,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },

  input: {
    activePointers: 3,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [PreloadScene, StartScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
