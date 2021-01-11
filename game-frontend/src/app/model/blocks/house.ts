import {Block} from './block';
import {Tile} from '../tiles/tile';
import {Tree} from '../tiles/tree';
import {Grass} from '../tiles/grass';

export class House implements Block {
  assetPath: string;
  points: number;
  radius: number;
  type: string;

  constructor(radius: number = 1, points: number = 5, type: string = 'game.models.tiles.House',
              assetPath: string = 'assets/house.svg') {
    this.assetPath = assetPath;
    this.radius = radius;
    this.points = points;
    this.type = type;
  }
  calculateBonusMalus(t: Tile): number {
    if (t instanceof Tree) {
      return 4;
    } else if (t instanceof Grass) {
      const tmpBlock: Block = t.getBlock();
      if (tmpBlock === null) {
        return 0;
      } else {
        const blockType  = t.getBlock().type.split('.');
        switch (blockType[blockType.length - 1]) {
          case 'House':
            return 5;
          case 'Circus':
            return 8;
          case 'Fountain':
            return 10;
          default:
            return -10;
        }
      }
    } else {
      return 0;
    }
  }

  getAssetPath(): string {
    return this.assetPath;
  }


}
