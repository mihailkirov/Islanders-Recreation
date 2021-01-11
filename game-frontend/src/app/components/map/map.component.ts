import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {GameService} from '../../service/game.service';
import {OverlayService} from '../../service/overlay.service';
import {MapData} from '../../model/map/map-data';
import {Subscription} from 'rxjs';
import {LoadMapBuilder} from '../../model/map/builder/LoadMapBuilder';
import {EndGamePopUpComponent} from '../end-game-pop-up/end-game-pop-up.component';
import {Block} from '../../model/blocks/block';
import {Tile} from '../../model/tiles/tile';
import {ShadowBlock} from '../../model/blocks/shadow-block';
import {RandomMapBuilder} from '../../model/map/builder/RandomMapBuilder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit, OnDestroy {


  resultMap: Map<string, string>;
  replacedClicked: boolean;
  isDisabled: boolean;
  private scoreSubscription: Subscription;
  private replaceButtonStateSubscription: Subscription;
  constructor(public gameService: GameService, public overlay: OverlayService) {
    this.gameService.game.map = RandomMapBuilder.create().build(); // has to be removed once welcome component fully integrated
    this.resultMap = new Map<string, string>();
    // Subscribe on changes of the state of the replace button
    this.replacedClicked = false;
    this.replaceButtonStateSubscription = gameService.replaceStateProvider
      .subscribe((state: boolean) => {
        this.replacedClicked = state;
        const b = new ShadowBlock(null);
        b.setReplace(this.replacedClicked);
      });
    this.scoreSubscription = gameService.scoreProvider
      .subscribe(() => {
        if (this.gameService.game.map.isThereStillSomeRoom() === false) {
          confirm('There is no more room, end of game');
          // auto save the current score
          this.gameService.storeNewScore(this.gameService.game.map.name, this.gameService.game.playerName,
            this.gameService.game.currentScore);
          // open  the end game overlay
          this.overlay.open(EndGamePopUpComponent, true);
        }
      });

  }
  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
    this.replaceButtonStateSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {}

  resetShadowBlock(): void{
    this.resultMap.clear();
    if (this.gameService.selectedBlock === undefined) {
      return;
    }
    const b = new ShadowBlock(null);
    if (this.replacedClicked){
      this.gameService.resetShadow(b.getReplaceBlock());
    } else{
      this.gameService.resetShadow(null);
    }
  }
  showPossibleResult(key: string): void {
    // Map of : key , path to score image
    const tile = this.gameService.game.map.tiles.get(key);
    if (this.replacedClicked){
      if (tile.getBlock() !== null && this.gameService.selectedBlock !== undefined ){
        const b = new ShadowBlock(null);
        b.setReplaceBlock(tile.getBlock());
        this.gameService.placeShadow(key);
        this.getReplacePreviewMap(this.resultMap, tile.getBlock(), this.gameService.selectedBlock, key);
      }
    } else {
      if (!tile.canBePlacedOver() || tile.getBlock() !== null || this.gameService.selectedBlock === undefined){
        return;
      }
      this.gameService.placeShadow(key);
      this.getNeighboursPreviewMap(this.resultMap, this.gameService.selectedBlock, key);
    }
  }
  onReceivedMap(map: MapData): void {
    this.gameService.game.map = LoadMapBuilder.create()
      .addMap(map)
      .setWidth(map.width)
      .build();
  }
  place(coordinates: string): void {
    if (this.replacedClicked) { // replace
      if (this.gameService.selectedBlock === undefined) {
        this.gameService.replaceStateProvider
          .next(false);
      }
      this.gameService
        .replaceBlock(coordinates);
      this.replacedClicked = false;
    } else { // place
      this.gameService
        .placeBlock(coordinates);
      const b = new ShadowBlock(null);
      b.setOldKey('');
      this.resultMap.clear();
    }
  }
  /**
   * From a key and a radius
   * returns an array of the keys of the neighbor tiles withing the radius
   * @param:
   * map : map of score previews
   * block : selected block
   * key : coords of tile on which the cursor is
   */
  getNeighboursPreviewMap(map, block: Block, key): void{
    const x = parseInt(key[1], null);
    const y = parseInt(key[3], null);
    let tile: Tile;
    let bonus = 0;
    let neighborKey;
    for (let x1 = 0; x1 < 10; x1++) {
      for (let y1 = 0; y1 < 10; y1++) {
        neighborKey = '(' + [x1, y1].join(',') + ')';
        if (( x1 >= x - block.radius && y1 >= y - block.radius) && (x1 <= x + block.radius && y1 <= y + block.radius)  ) {
          if (x1 === x && y1 === y){
            map.set(neighborKey, `assets/preview/${block.points}.svg`);
          } else {
            tile = this.gameService.game.map.tiles.get(neighborKey);
            bonus = block.calculateBonusMalus(tile);
            map.set(neighborKey, `assets/preview/${bonus}.svg`);
          }
        } else {
          map.set(neighborKey, `assets/preview/0.svg`);
        }
      }
    }
  }
  getReplacePreviewMap(map, oldBlock: Block, newBlock: Block, key): void{
    const x = parseInt(key[1], null);
    const y = parseInt(key[3], null);
    let newBlockBonus = 0;
    let oldBlockBonus = 0;
    let neighborKey;
    let tile;
    for (let x1 = 0; x1 < 10; x1++) {
      for (let y1 = 0; y1 < 10; y1++) {
        neighborKey = '(' + [x1, y1].join(',') + ')';
        tile = this.gameService.game.map.tiles.get(neighborKey);
        if (x1 === x && y1 === y){
          map.set(neighborKey, `assets/preview/${newBlock.points - oldBlock.points}.svg`);
        } else {
          if (( x1 >= x - oldBlock.radius && y1 >= y - oldBlock.radius) && (x1 <= x + oldBlock.radius && y1 <= y + oldBlock.radius)  ) {
            oldBlockBonus = oldBlock.calculateBonusMalus(tile);
          }
          if (( x1 >= x - newBlock.radius && y1 >= y - newBlock.radius) && (x1 <= x + newBlock.radius && y1 <= y + newBlock.radius)  ) {
            newBlockBonus = newBlock.calculateBonusMalus(tile);
          }
          map.set(neighborKey, `assets/preview/${newBlockBonus - oldBlockBonus}.svg`);
          newBlockBonus = 0;
          oldBlockBonus = 0;
        }
      }
    }
  }
  endGame(): void {
    this.overlay.open(EndGamePopUpComponent, true);
  }
}

