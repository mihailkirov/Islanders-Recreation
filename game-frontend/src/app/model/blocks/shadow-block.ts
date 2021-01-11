import {Block} from './block';
import {Tile} from '../tiles/tile';

export class ShadowBlock implements Block {
  static instance: ShadowBlock;
  assetPath: string;
  points: number;
  radius: number;
  type: string;
  oldKey: string;
  replace: boolean;
  replaceBlock: Block;
  constructor(block: Block) {
    if (!ShadowBlock.instance) {
      this.assetPath =  (block !== null ? block.getAssetPath() : '');
      this.radius = 0;
      this.points = 0;
      this.oldKey = '';
      this.type = 'game.models.tiles.ShadowBlock';
      ShadowBlock.instance = this;
    } else {
      ShadowBlock.instance.assetPath = (block !== null ? block.getAssetPath() : '');
    }
    return ShadowBlock.instance;
  }
  calculateBonusMalus(t: Tile): number {
    return 0;
  }
  getOldKey(): string{
    return this.oldKey;
  }
  getAssetPath(): string {
    return this.assetPath;
  }
  setOldKey(key: string): void{
    this.oldKey = key;
  }
  setReplace(on: boolean): void{
    this.replace = on;
  }
  setReplaceBlock(b: Block): void{
    this.replaceBlock = b;
  }
  getReplaceBlock(): Block{
    return this.replaceBlock;
  }
}
