import {Block} from './block';
import {Tile} from '../tiles/tile';
import {Tree} from '../tiles/tree';
import {Grass} from '../tiles/grass';
import {Water} from '../tiles/water';
import {isDefined} from '@ng-bootstrap/ng-bootstrap/util/util';

export class WindTurbine implements Block {
  assetPath: string;
  points: number;
  radius: number;
  type: string;
  constructor(radius: number = 1, points: number = 8, type: string = 'game.models.tiles.WindTurbine',
              assetPath= 'assets/wind-turbine.svg') {
    this.assetPath = assetPath;
    this.radius = radius;
    this.points = points;
    this.type = type;
  }
  calculateBonusMalus(t: Tile): number {
    if (t instanceof Tree) {
      return -5;
    } else if (t instanceof Water) {
      return 8;
    } else if (t instanceof  Grass && t.getBlock() !== null) {
      const blockType  = t.getBlock().type.split('.');
      switch (blockType[blockType.length - 1]) {
        case 'House':
          return -7;
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
