import Phaser from 'phaser';
import { PlayScene } from './scenes/PlayScene';
import { ResultScene } from './scenes/ResultScene';

export type GameShellOptions = {
  levelId: string;
  onGameExit: () => void;
};

export function createPhaserGame(
  parent: HTMLElement,
  opts: GameShellOptions,
): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 800,
    height: 520,
    backgroundColor: '#1a1525',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, PlayScene, ResultScene],
    audio: {
      disableWebAudio: false,
    },
    callbacks: {
      preBoot(game) {
        game.registry.set('levelId', opts.levelId);
        game.registry.set('onGameExit', opts.onGameExit);
      },
    },
  });
}

/** İlk sahne: varlıkları yükler ve Play sahnesine geçer. */
class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    const base = import.meta.env.BASE_URL;
    this.load.audio('bgm', `${base}assets/bgm.ogg`);
  }

  create(): void {
    const levelId = this.registry.get('levelId') as string | undefined;
    if (!levelId) {
      this.scene.start('PlayScene', { levelId: 'level_01' });
      return;
    }
    this.scene.start('PlayScene', { levelId });
  }
}
