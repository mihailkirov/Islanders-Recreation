import {Block} from './block';
import {Tile} from '../tiles/tile';
import {Tree} from '../tiles/tree';
import {House} from './house';
import {Grass} from '../tiles/grass';
import {Circus} from './circus';

export class Fountain implements Block {
  assetPath: string;
  points: number;
  radius: number;
  type: string;

  constructor(radius: number = 1, points: number = 4, type: string = 'game.models.tiles.Fountain',
              assetPath = 'assets/fountain.svg') {
    this.assetPath = assetPath;
    this.radius = radius;
    this.points = points;
    this.type = type;
  }

  calculateBonusMalus(t: Tile): number {
    if (t instanceof Tree) {
      return 4;
    } else if (t instanceof Grass && t.getBlock() !== null) {
      const blockType = t.getBlock().type.split('.');
      switch (blockType[blockType.length - 1]) {
        case 'House':
          return 5;
        case 'Circus':
          return 6;
        default:
          return 0;
      }
    } else {
      return 0;
    }
  }

  getAssetPath(): string {
    return this.assetPath;
  }
}
