import {TileData} from '../tiles/TileData';

export interface MoveData {
  type: string;
  coord: {
    x: number,
    y: number,
  };
  tile: TileData;
  points: number;
}
