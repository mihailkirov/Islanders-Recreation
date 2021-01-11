import {MapData} from '../map/map-data';
import {MoveData} from './move-data';

export interface ReplayData {
  moves: Array<MoveData>; // previous name is Move
  map: MapData;
}
