import {Block} from './block';
import {Tile} from '../tiles/tile';
import {Grass} from '../tiles/grass';

export class Circus implements Block {
  assetPath: string;
  points: number;
  radius: number;
  type: string;

  constructor(radius: number = 3, points: number = 10, type: string = 'game.models.tiles.Circus',
              assetPath = 'assets/circus.svg') {
    this.assetPath = assetPath;
    this.radius = radius;
    this.points = points;
    this.type = type;
  }

  calculateBonusMalus(t: Tile): number {
    if (t instanceof  Grass && t.getBlock() !== null){
        const blockType  = t.getBlock().type.split('.');
        switch (blockType[blockType.length - 1]) {
          case 'Circus':
            return -20;
          case 'House':
            return 10;
          default:
            return  0;
        }
    } else  {
      return 0;
    }
  }

  getAssetPath(): string {
    return this.assetPath;
  }
}
