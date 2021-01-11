import {Block} from '../blocks/block';
import {TileData} from './TileData';

export interface Tile extends TileData {
  imagePath: string;
  block: Block;
  type: string;
  canBePlacedOver(): boolean;

  addBlock(block: Block): void;

  getBlock(): Block;
  getAssetPath(): string;
  getType(): string;
}



