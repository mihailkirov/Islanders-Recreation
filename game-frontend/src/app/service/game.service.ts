import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../model/games/game';
import {GameImpl} from '../model/games/game-impl';
import {MapData, StringMap} from '../model/map/map-data';
import {Block} from '../model/blocks/block';
import {ReplayData} from '../model/moves/replay-data';
import {Replay} from '../model/moves/replay';
import {Subject, Subscription} from 'rxjs';
import {Move} from '../model/moves/move';
import {MoveData} from '../model/moves/move-data';
import {MoveFactory} from '../model/moves/move-factory';
import {House} from '../model/blocks/house';
import {OverlayService} from './overlay.service';
import {BlockFactory} from '../model/blocks/BlockFactory';
import {ShadowBlock} from '../model/blocks/shadow-block';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public availableBlocks = new Map<string, [Block, number]>();
  private replay: Replay;
  public selectedBlock: Block;
  public scoreProvider: Subject<number>;
  public replayScoreProvider: Subject<number>;
  public replaceStateProvider: Subject<boolean>;
  public availableReplacesProvider: Subject<number>;
  public receivedReplay: ReplayData;
  public showReplay: boolean;
  public showScore: boolean;
  public movesToAnimate: Array<Move>;
  // tslint:disable-next-line:variable-name
  private _game: Game;
  // You should start the development of the front-end without using
  // a back-end: start by displaying the map with fake data:

  constructor(private http: HttpClient, private overlay: OverlayService) {
    this._game = new GameImpl(this, 0, 10, undefined, overlay);
    this.scoreProvider = new Subject<number>();
    this.replayScoreProvider = new Subject<number>();
    this.availableReplacesProvider = new Subject<number>();
    this.replaceStateProvider = new Subject<boolean>();
    this.replay = new Replay({moves: new Array<MoveData>(), map: undefined});
    // Set up the game with fake data.
    this.receivedReplay = undefined;
    this.movesToAnimate = new Array<Move>();
  }

  /** Accessors */
  set currentGame(g: Game) {
    this._game = g;
  }
  get game(): Game {
    return this._game;
  }
  /** API methods */
  /**
   * Get all Map names.
   */
  getMapNames(): Promise<Array<string>> {
    return this.http
      .get<Array<string>>('game/maps/names', {})
      .toPromise();
  }

  /**
   * Get top 5 score for a given map.
   */
  getTop5Score(mapName: string): Promise<StringMap> {
    return this.http
      .get<StringMap>(`game/maps/top_score/${mapName}`, {})
      .toPromise();
  }

  /**
   * Methods for getting a new random map or a previously created one.
   */
  loadMap(mapName: string): Promise<MapData> {
    return this.http
      .get<MapData>(`game/maps/${mapName}`)
      .toPromise();
  }

  getRandomMap(): Promise<MapData> {
    return this.http
      .get<MapData>('/game/maps/new', {})
      .toPromise();
  }

  getReplaysMapNames(playerName: string): Promise<Array<string>> {
    return this.http
      .get<Array<string>>(`/game/replay/${playerName}`)
      .toPromise();
  }

  /**
   * Get replay according to the current playerName and mapName
   * Tested & working fine with mapName = 'test', playerName= 'Maxime'
   */
  getReplay(playerN = this.game.playerName, mapN = this.game.map.name): Promise<ReplayData> {
    return this.http
      .get<ReplayData>(`/game/replay/${playerN}/${mapN}`, {})
      .toPromise();
  }

  postReplay(playerN = this.game.playerName, mapN = this.game.map.name): Subscription {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.replay.moves = this.game.undoCollector;
    if (this.replay.moves.length === 0) {return ; } // no replay to send
    this.replay
      .addMap(this.game.map);
    const ignoreList = ['gameS', 'coordNumber', 'coordinates', 'imagePath'];

    function replacer(key, value): void {
      if (ignoreList.indexOf(key) > -1) {
        return;
      } else {
        return value;
      }
    }

    return this.http
      .post(`/game/replay/${playerN}/${mapN}`, JSON.stringify(this.replay, replacer), httpOptions)
      .subscribe(returnedData => {
        console.log(`result of post replay:${returnedData}`);
      }, error => {
        console.log(error);
      });
  }

  /**
   * Put new score in the backend (the backend only saves the best score for each player anyway)
   * Tested & working fine with mapName = 'test', playerName= 'Maxime'
   */
  storeNewScore(mapName: string = this.game.map.name, playerName: string = this.game.playerName, newScore: number): Subscription {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .put(`/game/maps/${mapName}/${playerName}/${newScore}`, null, httpOptions)
      .subscribe(returnedData => {
        console.log(`result of PUT new Score: ${returnedData}`);
      });
  }

  /** Game methods */
  calculatePoints(key: string): number {
    const sBlock = this.selectedBlock;
    let points = 0;
    if (sBlock !== undefined) {
      points = this.game.map
        .calculatePoints(key, sBlock);
      console.log('points: ' + points);
    }
    return points;
  }

  placeBlock(coordinates: string): void {
    if (this.selectedBlock === undefined) {
      return;
    } else {
      const m: Move = this.game.place(coordinates, this.selectedBlock);
      if (m !== undefined) {
        this.game.addMove(m);
      }
      this.selectedBlock = undefined;
    }
  }
  resetShadow(b: Block): void{
    const block  = new ShadowBlock(this.selectedBlock);
    if (block.getOldKey() !== ''){
      this.game.map.tiles.get(block.getOldKey()).block = b;
      block.setOldKey('');
    }
  }
  placeShadow(coordinates: string): void{
    const block  = new ShadowBlock(this.selectedBlock);
    this.game.shadowPlace(coordinates, block);
  }
  replaceBlock(coordinates: string): void {
    if (this.selectedBlock === undefined) {
      return;
    } else {
      const m: Move = this.game.replace(coordinates, this.selectedBlock);
      if (m !== undefined) {
        this.game
          .addMove(m);
      }
      this.selectedBlock = undefined;
    }
  }

  animateReplay(): void {
    // First we clear the current map
    if (this.receivedReplay.map.name !== this.game.map.name) {
      throw new Error('You are trying to animate a replay with a different map from the one you are playing right now');
    }
    this.game.map.clearForReplay();
    // Then we animate all the moves recorded in replay
    // Those moves are recorded in the right order
    // The animation is done in the popUp component, here we simply fill a container with Moves object
    this.movesToAnimate = [];
    const mvFactory = new MoveFactory(this);
    for (const move of this.receivedReplay.moves) {
      this.movesToAnimate.push(mvFactory.getMove(move));
    }
    this.showReplay = true;
  }

  // Reinitialize all gameService and game attributes
  resetGame(): void {
    this.game.reset();
    this.initAvailableBlocks();
    this.movesToAnimate = new Array<Move>();
    this.replaceStateProvider = new Subject<boolean>();
    this.availableReplacesProvider = new Subject<number>();
  }

  // I don't know if this is the best place to put that method
  initAvailableBlocks(): void {
    const blockFactory = new BlockFactory();
    const house = blockFactory.createFromStr('House');
    const circus = blockFactory.createFromStr('circus');
    const fountain = blockFactory.createFromStr('FoUntain');
    const windTurbine = blockFactory.createFromStr('windTurbine');

    this.availableBlocks.clear();
    this.availableBlocks.set(house.type, [house, 1]);
    this.availableBlocks.set(circus.type, [circus, 0]);
    this.availableBlocks.set(fountain.type, [fountain, 0]);
    this.availableBlocks.set(windTurbine.type, [windTurbine, 0]);
  }
}
