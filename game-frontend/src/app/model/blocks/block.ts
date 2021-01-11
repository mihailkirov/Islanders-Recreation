import {Tile} from '../tiles/tile';
import {BlockData} from './BlockData';

export interface Block extends BlockData {
  assetPath: string;
  type: string;
  points: number;
  radius: number;

  getAssetPath(): string;

  calculateBonusMalus(t: Tile): number;
}
