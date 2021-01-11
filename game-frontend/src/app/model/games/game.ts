import {Move} from '../moves/move';
import {Block} from '../blocks/block';
import {MapInterface} from '../map/MapInterface';

/**
 * Game behaviour interface to be implemented for every game
 */
export interface Game {

  currentScore: number;
  nextScoreToReach: number;
  redoCollector: Array<Move>;
  undoCollector: Array<Move>;
  playerName: string;
  map: MapInterface;
  collectorUndo(): Move;
  collectorRedo(): Move;
  addMove(m: Move): void;
  place(coordinates: string, b: Block): Move;
  reset(): void;
  replace(coordinates: string, b: Block): Move;
  shadowPlace(coordinates: string, b: Block): void;

}
