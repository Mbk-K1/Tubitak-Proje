import type { LevelData } from '../../game/types';
import level01 from './level_01.json';
import level02 from './level_02.json';
import level03 from './level_03.json';

export const LEVEL_ORDER = ['level_01', 'level_02', 'level_03'] as const;

export const LEVELS: Record<string, LevelData> = {
  level_01: level01 as LevelData,
  level_02: level02 as LevelData,
  level_03: level03 as LevelData,
};

export function getLevel(id: string): LevelData | undefined {
  return LEVELS[id];
}
