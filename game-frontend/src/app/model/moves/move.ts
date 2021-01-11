import {Tile} from '../tiles/tile';
import {Undoable} from 'interacto';
import {MoveData} from './move-data';
import {Block} from '../blocks/block';


export interface Move extends Undoable, MoveData {

  type: string;
  coord: {x: number, y: number};
  tile: Tile;
  points: number;
  block: Block;

  execute(): number;

  undo(): void;

  redo(): void;

  toString(): string;

  getUndoName(): string;

}
