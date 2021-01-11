import {MapData} from './map-data';
import {Tile} from '../tiles/tile';
import {Block} from '../blocks/block';

export interface MapInterface {
  fiveBestRes: Map<string, number>;
  name: string;
  scores: Map<string, number>;
  tiles: Map<string, Tile>;
  width: number;
  nbFreeGrass: number;

  getNeighbours(coordinates: string, radius: number): Array<Tile>;

  calculatePoints(key: string, b: Block): number;

  getTile(x: number, y: number): Tile;
  clearForReplay(): void;
  toMapData(): MapData;


  isThereStillSomeRoom(): boolean;
}
