import {Tile} from './tile';
import {Block} from '../blocks/block';
import {ShadowBlock} from '../blocks/shadow-block';

export class Grass implements Tile {

  block: Block;
  imagePath: string;
  type: string;

  constructor(b: Block = null, type: string = 'game.models.tiles.Grass', imagePath: string = 'assets/empty.svg') {
    this.imagePath = imagePath;
    this.block = b;
    this.type = type;
  }
  /**
   * Getters and setters
   */
  getBlock(): Block {
    return this.block;
  }

  getAssetPath(): string {
    if (this.block != null) {
      return this.block.getAssetPath();
    }else {
      return this.imagePath;
    }
  }
  addBlock(block: Block): void {
    if (block != null) {
      this.block = block;
    }
  }
  getType(): string {
      return this.type;
}
  canBePlacedOver(): boolean {
    return this.block == null || this.block instanceof ShadowBlock;
  }


}
