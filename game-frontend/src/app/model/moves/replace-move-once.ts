import {Move} from './move';
import {Tile} from '../tiles/tile';
import {Block} from '../blocks/block';
import {GameService} from '../../service/game.service';
import {PlaceMove} from './place-move';
import {GameImpl} from '../games/game-impl';

export class ReplaceMoveOnce implements Move {
  type: string;
  coord: {x: number, y: number};
  tile: Tile;
  oldMove: Move;
  points: number;
  block: Block;
  private pointsNewBlock = 0;

  constructor(private coordinates: string, b: Block, private gameS: GameService) {
    this.coord =  {x: parseInt(coordinates[1], null), y: parseInt(coordinates[3], null)};
    this.tile = gameS.game.map.tiles.get(coordinates); // hope not null
    this.block = b;
    this.type = 'game.models.moves.ReplaceMoveOnce';
  }

  execute(): number {
    this.oldMove = new PlaceMove(this.coordinates, this.tile.block, this.gameS);
    this.pointsNewBlock = this.block.points;
    this.oldMove.points = this.oldMove.block.points;
    // Calculating the points of the blocked that'll be replaced
    this.gameS.game.map
      .getNeighbours(this.coordinates, this.tile.block.radius)
      .forEach(tile => {
        this.oldMove.points += this.oldMove.block.calculateBonusMalus(tile);
      });
    // Calculating the new points
    this.gameS.game.map
      .getNeighbours(this.coordinates, this.block.radius)
      .forEach(tile => {
        this.pointsNewBlock += this.block.calculateBonusMalus(tile);
      });
    this.tile.block = this.block;
    this.points = this.pointsNewBlock - this.oldMove.points;
    return this.points;
}

  getUndoName(): string {
    return '';
  }
  redo(): void {
    if (this.oldMove === undefined) {
      return;
    } else {
      if (this.oldMove.points >= this.pointsNewBlock) {
        this.points = (this.oldMove.points - this.pointsNewBlock);
      } else {
        this.points = - (this.pointsNewBlock - this.oldMove.points);
      }
      const gameImp = this.gameS.game as GameImpl;
      this.gameS.availableReplacesProvider.next(--gameImp.numberOfReplace);
      this.exchange(true);
    }
  }
  undo(): void {
   if (this.oldMove === undefined) {
     return;
   } else  {
     // Update the points
     if (this.oldMove.points >= this.pointsNewBlock) {
       this.points = - (this.oldMove.points - this.pointsNewBlock);
     } else {
       this.points = this.pointsNewBlock - this.oldMove.points;
     }
     this.exchange(false);
     const gameImp = this.gameS.game as GameImpl;
     this.gameS.availableReplacesProvider.next(++gameImp.numberOfReplace);
    }
  }
  private exchange(state: boolean): void {
    this.gameS.replaceStateProvider.next(state);
    const tmpBlock: Block = this.oldMove.block;
    const tmpPoints: number = this.oldMove.points;
    this.oldMove.block = this.tile.block;
    this.oldMove.points = this.pointsNewBlock;
    this.pointsNewBlock = tmpPoints;
    this.tile.block = tmpBlock;
  }

}
