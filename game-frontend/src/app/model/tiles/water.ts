import {Tile} from './tile';
import {Block} from '../blocks/block';

export class Water implements Tile {

  block: Block;
  imagePath: string;
  type: string;

  constructor(b: Block = null, type: string = 'game.models.tiles.Water', imagePath: string = 'assets/water.svg') {
    this.imagePath = imagePath;
    this.block = b;
    this.type = type;
  }
  canBePlacedOver(): boolean {
    return false;
  }
  /**
   * Getters and setters
   */
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

  getBlock(): Block {
    return this.block;
  }
  getType(): string {
    return this.type;
  }
}
