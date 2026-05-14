export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LevelData {
  id: string;
  name: string;
  description?: string;
  relatedTermSlugs: string[];
  width: number;
  height: number;
  gravity: number;
  playerSpeed: number;
  musicBpm?: number;
  spawn: { x: number; y: number };
  finishX: number;
  platforms: Rect[];
  spikes: Rect[];
}

export interface Term {
  slug: string;
  title: string;
  meaning: string;
  modern: string;
  tags: string[];
}
