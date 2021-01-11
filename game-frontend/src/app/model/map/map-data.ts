import {TileData} from '../tiles/TileData';
// Actually has to be called StringIntegerMap or idk

export interface  StringMap {
  [key: string]: number;
}

export interface TileStringMap {
  [key: string]: TileData;
}

/**
 * Interface used only for data binding (JSON->MapData)
 * (copy from UML)
 */
export interface MapData {
  name: string;
  width: number;
  scores: StringMap;
  tiles: TileStringMap;
  fiveBestRes: StringMap;
}

