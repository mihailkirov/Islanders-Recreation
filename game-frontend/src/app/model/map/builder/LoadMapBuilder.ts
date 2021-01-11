import {MapBuilder} from './MapBuilder';
import {MapInterface} from '../MapInterface';
import {MapData} from '../map-data';
import {MapClass} from '../MapClass';
import {TileFactory} from '../../tiles/TileFactory';

export class LoadMapBuilder implements MapBuilder {
  width: number;
  private mapData: MapData;
  public static create(): LoadMapBuilder {
    return new LoadMapBuilder();
  }
  private constructor() {
    this.width = 10;
    this.mapData = undefined;
  }
  build(): MapInterface {
    if (this.mapData === undefined) {
      throw new Error('no mapData to build from');
    } else {
      const m: MapInterface = new MapClass(this.width, this.mapData.name);
      // Five best results construction
      if (this.mapData.fiveBestRes !== undefined) { // temporary solution, some maps on the backEnd haven't been updated
        Object.keys(this.mapData.fiveBestRes)
          .forEach(key => {
            m.fiveBestRes
              .set(key, this.mapData.fiveBestRes[key]);
          });
      }
      // Scores construction
      Object.keys(this.mapData.scores)
        .forEach(key => {
          m.scores
            .set(key, this.mapData.scores[key]);
        });
      m.name = this.mapData.name;
      // Instantiating the tile objects
      const tmp: TileFactory = new TileFactory();
      Object.keys(this.mapData.tiles)
        .forEach(key => {
          const coordinates = key.replace(/\s/g, '');
          m.tiles
            .set(coordinates, tmp.getTile(this.mapData.tiles[key]));
        });
      m.isThereStillSomeRoom();
      console.log(m);
      return m;
    }
  }
  addMap(mapData: MapData): MapBuilder {
    this.mapData = mapData;
    return this;
  }
  setWidth(width: number): LoadMapBuilder {
    this.width = width;
    return this;
  }
}
