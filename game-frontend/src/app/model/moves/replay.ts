import {Move} from './move';
import {ReplayData} from './replay-data';
import {MapData} from '../map/map-data';
import {MoveFactory} from './move-factory';
import {MapInterface} from '../map/MapInterface';

export class Replay implements ReplayData {

  moves: Array<Move>;
  map: MapData;


  constructor(data: ReplayData) {
    this.moves = new Array<Move>();
    if (data.map == null) {
      return;
    }
    this.map = data.map;
    const m = new MoveFactory();
    for (const move of data.moves) {
      this.moves.push(m.getMove(move));
    }
  }

  addMap(m: MapInterface): void {
    this.map = m.toMapData();
  }

  addMove(m: Move): void {
    this.moves
      .push(m);
  }
}
