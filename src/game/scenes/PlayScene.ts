import Phaser from 'phaser';
import { getLevel } from '../../data/levels';
import type { LevelData } from '../types';

type PlayInit = { levelId: string };

export class PlayScene extends Phaser.Scene {
  private level!: LevelData;
  private player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private spikes!: Phaser.Physics.Arcade.StaticGroup;
  private finishRect!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumpKey!: Phaser.Input.Keyboard.Key;
  private pendingPointerJump = false;
  private music?: Phaser.Sound.BaseSound;
  private isDead = false;

  constructor() {
    super('PlayScene');
  }

  init(data: PlayInit): void {
    const level = getLevel(data.levelId);
    if (!level) {
      throw new Error(`Bilinmeyen seviye: ${data.levelId}`);
    }
    this.level = level;
  }

  create(): void {
    this.isDead = false;
    this.physics.world.gravity.y = this.level.gravity;

    if (this.sound.get('bgm')) {
      this.music = this.sound.add('bgm', { loop: true, volume: 0.32 });
      this.music.play();
    }

    this.events.once('shutdown', () => {
      this.music?.stop();
    });

    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();

    for (const p of this.level.platforms) {
      const rect = this.add.rectangle(
        p.x + p.w / 2,
        p.y + p.h / 2,
        p.w,
        p.h,
        0x3d3558,
      );
      rect.setStrokeStyle(2, 0x6b5b95);
      this.physics.add.existing(rect, true);
      (rect.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
      this.platforms.add(rect);
    }

    for (const s of this.level.spikes) {
      const spike = this.add.rectangle(
        s.x + s.w / 2,
        s.y + s.h / 2,
        s.w,
        s.h,
        0xd94a5c,
      );
      spike.setStrokeStyle(1, 0xff8a9b);
      this.physics.add.existing(spike, true);
      (spike.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
      this.spikes.add(spike);
    }

    this.platforms.refresh();

    this.player = this.physics.add.image(
      this.level.spawn.x,
      this.level.spawn.y,
      '__WHITE',
    );
    this.player.setTint(0x4ade80);
    this.player.setDisplaySize(30, 30);
    this.player.body.setAllowGravity(true);
    this.player.body.setCollideWorldBounds(false);

    this.physics.add.collider(this.player, this.platforms);

    const fz = this.add.rectangle(
      this.level.finishX,
      this.level.height / 2,
      36,
      this.level.height,
      0x38bdf8,
      0.35,
    );
    this.physics.add.existing(fz, true);
    (fz.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
    this.finishRect = fz;

    this.physics.add.overlap(this.player, this.finishRect, () => {
      this.handleWin();
    });

    this.physics.add.overlap(this.player, this.spikes, () => {
      this.handleDeath();
    });

    this.cameras.main.setBounds(0, 0, this.level.width, this.level.height);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.08, -120, 0);
    this.cameras.main.setBackgroundColor('#120f1a');

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.jumpKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    this.input.on('pointerdown', () => {
      this.pendingPointerJump = true;
    });

    this.add
      .text(16, 12, this.level.name, {
        fontFamily: 'Outfit, system-ui',
        fontSize: '18px',
        color: '#f4f4f5',
      })
      .setScrollFactor(0)
      .setDepth(10);

    this.add
      .text(16, 36, 'Zıpla: Boşluk / Yukarı ok', {
        fontFamily: 'Outfit, system-ui',
        fontSize: '13px',
        color: '#a1a1aa',
      })
      .setScrollFactor(0)
      .setDepth(10);
  }

  update(): void {
    if (this.isDead) return;

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(this.level.playerSpeed);

    const keyJump =
      Phaser.Input.Keyboard.JustDown(this.jumpKey) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.up!);
    const wantsJump = keyJump || this.pendingPointerJump;
    if (wantsJump && (body.blocked.down || body.touching.down)) {
      body.setVelocityY(-520);
      this.pendingPointerJump = false;
    }

    if (this.player.y > this.level.height + 80) {
      this.handleDeath();
    }
  }

  private handleDeath(): void {
    if (this.isDead) return;
    this.isDead = true;
    this.cameras.main.flash(
      120,
      80,
      20,
      20,
      false,
      (_cam: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) {
          this.respawn();
        }
      },
    );
  }

  private respawn(): void {
    this.isDead = false;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    this.player.setPosition(this.level.spawn.x, this.level.spawn.y);
    body.setVelocity(0, 0);
  }

  private handleWin(): void {
    if (this.isDead) return;
    this.isDead = true;
    this.music?.stop();
    this.scene.start('ResultScene', { level: this.level });
  }
}
