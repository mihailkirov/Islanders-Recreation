import {Move} from './move';
import {Tile} from '../tiles/tile';
import {Block} from '../blocks/block';
import {GameService} from '../../service/game.service';

export class PlaceMove implements Move {
  type: string;
  coord: {x: number, y: number};
  tile: Tile;
  points = 0;
  block: Block;

  constructor(private coordinates: string, b: Block, private gameS: GameService) {
    this.coord =  {x: parseInt(coordinates[1], null), y: parseInt(coordinates[3], null)};
    this.tile = gameS.game.map.tiles.get(coordinates);
    this.block = b;
    this.type = 'game.models.moves.PlaceMove';
  }

  /**
   * Execution (placement, put a block on the tile)  of the move.
   */
  execute(): number {
    this.points = this.block.points;
    this.gameS.game.map
      .getNeighbours(this.coordinates, this.block.radius)
      .forEach(tile => this.points += this.block.calculateBonusMalus(tile));
    this.tile.block = this.block;
    return this.points;
  }

  getUndoName(): string {
    return '';
  }

  /**
   * To perform a redo we have to have performed an undo before that
   * aka removed the current block
   */
  redo(): void {
    if (this.tile.block == null) {
      this.tile.block = this.block;
    }
  }

  /**
   * Undo applied on PlaceMove means that a block on grass tile is removed
   * and the block is has nothing on it.(for me)
   */
  undo(): void {
    if (this.tile.block !== null) { // a block has been poistioned
      this.tile.block = null;
    }
  }
  toString(): string {
    return 'PlaceMove: ' + this.tile.getType() + ' ' + this.coord + ' ' + this.points + ' ' + this.block;
  }

  /*
  toJSON(): string {
    return `{
    type: ${this.type},
    coord: ${JSON.stringify(this.coord)},
    points: ${this.points},
    tile: ${JSON.stringify(this.tile)},
    block: ${JSON.stringify(this.block)}`;
  }
*/

}
