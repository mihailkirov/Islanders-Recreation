import {BlockData} from './BlockData';
import {Block} from './block';
import {House} from './house';
import {Circus} from './circus';
import {Fountain} from './fountain';
import {WindTurbine} from './wind-turbine';

/**
 * Block factory to instantiate object of type Block from a blockData (REST)
 */
export class BlockFactory {
  constructor() {
  }

  // Used in *ngFor when key returns a string instead of the actual block
  // this is a workaround
  createFromStr(blockStr: string): Block {
    const tmp = JSON.stringify(blockStr).toString().split('type":')[1];
    let blockName;
    if (tmp !== undefined) {
       blockName = tmp.split('}')[0];
    } else {
      blockName = blockStr;
    }
    switch (blockName.toLowerCase()) {
      case '"game.models.tiles.house"':
      case 'house':
        return new House();
      case '"game.models.tiles.circus"':
        case 'circus':
          return new Circus();
      case '"game.models.tiles.fountain"':
        case 'fountain':
          return new Fountain();
      case '"game.models.tiles.windTurbine"':
        case 'windturbine':
        return new WindTurbine();
      default:
        return null;
    }
  }

  getBlock(b: BlockData): Block {
    if (b == null) {
      return null;
    }
    const type = b.type.split('.');
    switch (type[type.length - 1]) {
      case 'House': {
        return new House(b.radius, b.points, b.type);
      }
      case 'Circus': {
        return new Circus(b.radius, b.points, b.type);
      }
      case 'Fountain': {
        return new Fountain(b.radius, b.points, b.type);
      }
      case 'WindTurbine': {
        return new WindTurbine(b.radius, b.points, b.type);
      }
      default:
        return null;
    }
  }

}
