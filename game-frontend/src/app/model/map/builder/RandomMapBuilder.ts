import {MapBuilder} from './MapBuilder';
import {MapInterface} from '../MapInterface';
import {MapClass} from '../MapClass';
import {Water} from '../../tiles/water';
import {Tree} from '../../tiles/tree';
import {Grass} from '../../tiles/grass';

export class RandomMapBuilder implements MapBuilder {
  width: number;
  static create(): MapBuilder {
    return new RandomMapBuilder();
  }

  private constructor() {
    this.width = 10;
  }

  build(): MapInterface {
    const map: MapInterface = new MapClass(this.width);
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.width; j++) {
        const random = Math.floor((Math.random() * 5) + 1);
        const key: string = '(' + [i, j].join(',') + ')';
        switch (random) {
          case 1:
            map.tiles.set(key, new Water());
            break;
          case 2:
            map.tiles.set(key, new Tree());
            break;
          default:
            map.tiles.set(key, new Grass());
        }
      }
    }
    map.isThereStillSomeRoom();
    return map;
  }
  setWidth(width: number): MapBuilder {
    this.width = width;
    return this;
  }
}
