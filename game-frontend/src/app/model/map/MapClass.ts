/**
 * MapClass class implementation
 */
import {MapData, StringMap, TileStringMap} from './map-data';
import {Tile} from '../tiles/tile';
import {Block} from '../blocks/block';
import {MapInterface} from './MapInterface';

export class MapClass implements MapInterface {
  fiveBestRes: Map<string, number>;
  name: string;
  scores: Map<string, number>;
  tiles: Map<string, Tile>;
  width: number;
  nbFreeGrass: number;

  constructor(width: number = 10, name: string = 'undefined', scores: Map<string, number> = new Map<string, number>(),
              tiles: Map<string, Tile> = new Map<string, Tile>(),
              fiveBestRes: Map<string, number> = new Map<string, number>()) {
    this.fiveBestRes = fiveBestRes;
    this.name = name;
    this.scores = scores;
    this.tiles = tiles;
    this.width = width;
  }

  /**
   * Collect all the neighbours of a Tile at position x,y within a radius of radius
   *
   */
  getNeighbours(key, radius: number): Array<Tile> {

    const neighbours: Array<Tile> = [];
    let tmpTile: Tile;
    const x = parseInt(key[1], null);
    const y = parseInt(key[3], null);
    for (let x1 = x - radius; x1 <= x + radius; x1++) {
      for (let y1 = y - radius; y1 <= y + radius; y1++) {
        if (x !== x1 || y !== y1) {
          tmpTile = this.tiles.get('(' + [x1, y1].join(',') + ')');
          if (tmpTile !== undefined) {
            neighbours.push(tmpTile);
          }
        }
      }
    }
    return neighbours;
  }

  calculatePoints(key: string, b: Block): number {
    let t: Tile;
    let sumPoints = b.points;
    for (t of this.getNeighbours(key, b.radius)) {
      sumPoints += b.calculateBonusMalus(t);
    }
    return sumPoints;
  }

  /**
   * Get the tile at position x and y
   */
  getTile(x: number, y: number): Tile {
    return this.tiles
      .get([x, y].join(',')); // return undefined if not existing key
  }

  /**
   * Temporary method
   */
  clearForReplay(): void {
    this.tiles.forEach(value => {
      if (value.block !== null) {
        value.block = null;
      }
    });
  }
  /**
   * Get the mapData object corresponding to the current MapClass
   */
  // tslint:disable-next-line:no-shadowed-variable
  toMapData(): MapData {
    const m = {} as MapData;
    m.width = this.width;
    m.name = this.name;
    const sc = {} as StringMap;
    for (const name of this.scores.keys()) {
      sc[name] = this.scores.get(name);
    }
    const tl = {} as TileStringMap;
    for (const coord of this.tiles.keys()) {
      tl[coord] = this.tiles.get(coord);
    }
    const bestRes = {} as StringMap;
    for (const name of this.fiveBestRes.keys()) {
      bestRes[name] = this.fiveBestRes.get(name);
    }
    m.tiles = tl;
    m.fiveBestRes = bestRes;
    m.scores = sc;
    return m;
  }

  isThereStillSomeRoom(): boolean {
      // tslint:disable-next-line:triple-equals
      if (this.nbFreeGrass === undefined) {
        this.nbFreeGrass = 0;
        for (const tile of this.tiles.values()) {
          if (tile.getAssetPath() === 'assets/empty.svg') {
            this.nbFreeGrass++;
          }
        }
        return true;
      } else {
        this.nbFreeGrass--;
      }
      return this.nbFreeGrass > 0;
  }


}
