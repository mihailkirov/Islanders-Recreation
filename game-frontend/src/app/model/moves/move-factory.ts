import {TileFactory} from '../tiles/TileFactory';
import {MoveData} from './move-data';
import {Move} from './move';
import {PlaceMove} from './place-move';
import {ReplaceMoveOnce} from './replace-move-once';
import {BlockFactory} from '../blocks/BlockFactory';
import {GameService} from '../../service/game.service';

export class MoveFactory {

  private tileFactory: TileFactory;
  private blockFactory: BlockFactory;

  constructor(private gameS: GameService = null) {
    this.tileFactory = new TileFactory();
    this.blockFactory = new BlockFactory();
  }

  public getMove(data: MoveData): Move {
    // Type of the data is important to be submitted to the object
    // for backend deserialization
    const type = data.type.split('.');
    let res: Move;
    const coordinatesString: string =  '(' + [data.coord.x, data.coord.y].join(',') + ')';
    switch (type[type.length - 1]) {
      case 'PlaceMove':
        res = new PlaceMove(coordinatesString, this.blockFactory.getBlock(data.tile.block), this.gameS);
        break;
      case 'ReplaceMoveOnce':
        res = new ReplaceMoveOnce(coordinatesString, this.blockFactory.getBlock(data.tile.block), this.gameS);
        break;
      default:
        res = null;
        console.log('ERROR IN MV FACTORY');
    }
    return res;
  }

}
