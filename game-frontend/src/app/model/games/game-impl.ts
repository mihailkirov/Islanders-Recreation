import {Game} from './game';
import {Move} from '../moves/move';
import {MapClass} from '../map/MapClass';
import {Block} from '../blocks/block';
import {PlaceMove} from '../moves/place-move';
import {GameService} from '../../service/game.service';
import {ReplaceMoveOnce} from '../moves/replace-move-once';
import {Grass} from '../tiles/grass';
import {Tile} from '../tiles/tile';
import {MapInterface} from '../map/MapInterface';
import {OverlayService} from '../../service/overlay.service';
import {ShadowBlock} from '../blocks/shadow-block';

export class GameImpl implements Game {
  // tslint:disable-next-line:variable-name
  private _currentScore: number;
  // tslint:disable-next-line:variable-name
  private _nextScoreToReach: number;
  private scoreIncrement = 10;
  redoCollector: Array<Move>;
  undoCollector: Array<Move>;
  // tslint:disable-next-line:variable-name
  private _playerName: string;
  // tslint:disable-next-line:variable-name
  private _map: MapClass;
  // tslint:disable-next-line:variable-name
  private _numberOfReplace: number;

  constructor(private gameService: GameService, currentScore: number = 0, private nextScore: number = 10,
              playerName: string,  public overlay: OverlayService, numberOfReplace: number = 1) {
    this._nextScoreToReach = nextScore;
    this._currentScore = currentScore;
    this._playerName = playerName;
    this._map = new MapClass();
    this.undoCollector = new Array<Move>();
    this.redoCollector = new Array<Move>();
    this._numberOfReplace = numberOfReplace;
  }

  replace(coordinates: string, b: Block): Move {
    const tmpTile: Tile = this.map.tiles.get(coordinates);
    if ((tmpTile instanceof Grass)
      && tmpTile.getBlock() !== null) {
      const shadow = new ShadowBlock(null);
      this.gameService.resetShadow(shadow.getReplaceBlock());
      this._numberOfReplace--;
      this.gameService.availableReplacesProvider.next(this._numberOfReplace);
      return new ReplaceMoveOnce(coordinates, b, this.gameService);
    }
    return undefined;
    }
  reset(): void {
    this.redoCollector = new Array<Move>();
    this.undoCollector = new Array<Move>();
    this.currentScore = 0;
    this.gameService.scoreProvider.next(this.currentScore);
    this.nextScoreToReach = this.nextScore;
  }
  place(coordinates: string, b: Block): Move {
    if (this._map.tiles
      .get(coordinates)
      .canBePlacedOver()) {
      return new PlaceMove(coordinates, b, this.gameService);
    } else {
      return undefined;
    }
  }
  shadowPlace(coordinates: string, b: ShadowBlock): void{
    b.setOldKey(coordinates);
    this._map.tiles.get(coordinates).addBlock(b);
  }
  get map(): MapInterface {
    return this._map;
  }

  set map(m: MapInterface) {
    this._map = m;
  }

  get playerName(): string {
    return this._playerName;
  }

  set playerName(value: string) {
    this._playerName = value;
  }
  get numberOfReplace(): number {
    return this._numberOfReplace;
  }
  set numberOfReplace(value: number) {
    this._numberOfReplace = value;
  }
  get nextScoreToReach(): number {
    return this._nextScoreToReach;
  }

  set nextScoreToReach(value: number) {
    this._nextScoreToReach = value;
  }

  get currentScore(): number {
    return this._currentScore;
  }

  set currentScore(value: number) {
    this._currentScore = value;
  }
  updateScore(score: number, sign: number): void{
    this.currentScore += score * sign;
    while (this.currentScore >= this.nextScoreToReach){
      this.nextScoreToReach += this.scoreIncrement;
      this.gameService.availableBlocks.forEach(block => block[1] += 1);
    }
    while (this.currentScore < (this.nextScoreToReach - this.scoreIncrement)){
      this.nextScoreToReach -= this.scoreIncrement;
      this.gameService.availableBlocks.forEach(block => block[1] -= 1);
    }

  }

  addMove(m: Move): void {
    if (this.gameService.availableBlocks.get(m.block.type)[1] !== 0) {
      this.undoCollector.push(m);
      this.redoCollector = []; // redo is incompatible after placing a move
      // Execute and set the new score
      this.updateScore(m.execute(), 1);
      this.gameService.availableBlocks.get(m.block.type)[1]--;
      this.gameService.scoreProvider
        .next(this.currentScore);
    }
  }

  collectorRedo(): Move {
    if (this.redoCollector.length !== 0) {
      let lastMove: Move;
      lastMove = this.redoCollector.pop();
      lastMove.redo();
      this.undoCollector.push(lastMove);
      this.updateScore(lastMove.points, 1);
      this.gameService.scoreProvider
        .next(this.currentScore);
      this.gameService.availableBlocks.get(lastMove.block.type)[1]--;
      return lastMove;
    }
  }

  collectorUndo(): Move {
    if (this.undoCollector.length !== 0) {
      let lastMove: Move;
      lastMove = this.undoCollector.pop();
      lastMove.undo();
      this.redoCollector.push(lastMove);
      this.updateScore(lastMove.points, -1);
      this.gameService.scoreProvider
        .next(this.currentScore);
      this.gameService.availableBlocks.get(lastMove.block.type)[1]++;
      return lastMove;
    }
  }
}
