import {TileData} from './TileData';
import {Grass} from './grass';
import {Water} from './water';
import {Tree} from './tree';
import {Tile} from './tile';
import {BlockFactory} from '../blocks/BlockFactory';

export class TileFactory {
  private b: BlockFactory;

  constructor(b: BlockFactory = new BlockFactory()) {
    this.b = b;
  }

  createFromStr(tileType: string): Tile {
    switch (tileType.toLowerCase()) {
      case 'Grass':
        return new Grass(null);
      case 'Water':
        return new Water();
      case 'Tree':
        return new Tree();
      default:
        return null;
    }
  }
  public getTile(data: TileData): Tile {
    // Type of the data is important to be submitted to the object
    // for backend deserialization
    const type = data.type.split('.');
    switch (type[type.length - 1]) {
      case 'Grass':
        return new Grass(this.b.getBlock(data.block), data.type);
      case 'Water':
        return new Water(this.b.getBlock(data.block), data.type);
      case 'Tree':
        return new Tree(this.b.getBlock(data.block), data.type);
      default:
        return null;
    }
  }
}
