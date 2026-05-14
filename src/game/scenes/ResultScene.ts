import Phaser from 'phaser';
import type { LevelData, Term } from '../types';
import termsData from '../../data/terms.json';

type ResultInit = { level: LevelData };

const terms = termsData as Term[];

export class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create(data: ResultInit): void {
    const level = data?.level;
    if (!level) return;

    const related = terms.filter((t) => level.relatedTermSlugs.includes(t.slug));

    this.cameras.main.setScroll(0, 0);
    this.add
      .rectangle(400, 260, 820, 540, 0x0f0b14, 0.92)
      .setStrokeStyle(2, 0x4ade80);

    this.add
      .text(400, 90, 'Seviye tamamlandı!', {
        fontFamily: 'Outfit, system-ui',
        fontSize: '28px',
        color: '#fafafa',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 130, level.name, {
        fontFamily: 'Literata, Georgia, serif',
        fontSize: '18px',
        color: '#a7f3d0',
      })
      .setOrigin(0.5);

    let y = 175;
    for (const t of related) {
      const block = [
        t.title,
        `Ne işe yarardı: ${t.meaning}`,
        `Bugün: ${t.modern}`,
      ].join('\n');
      this.add
        .text(400, y, block, {
          fontFamily: 'Literata, Georgia, serif',
          fontSize: '15px',
          color: '#e4e4e7',
          align: 'center',
          lineSpacing: 6,
          wordWrap: { width: 680 },
        })
        .setOrigin(0.5, 0);
      y += 110;
    }

    this.add
      .text(400, 470, 'Çıkmak için Enter, Esc veya ekrana dokun', {
        fontFamily: 'Outfit, system-ui',
        fontSize: '15px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    const exit = this.registry.get('onGameExit') as (() => void) | undefined;
    const doExit = () => exit?.();

    const kb = this.input.keyboard;
    kb?.once('keydown-ENTER', doExit);
    kb?.once('keydown-ESC', doExit);
    this.input.once('pointerdown', doExit);
  }
}
