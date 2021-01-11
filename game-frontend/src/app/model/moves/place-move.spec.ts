import {PlaceMove} from './place-move';
import {GameService} from '../../service/game.service';
import {House} from '../blocks/house';
import {HttpClient} from '@angular/common/http';

describe('PlaceMove', () => {
  it('should create an instance', () => {
    expect(new PlaceMove('0,0', new House(), new GameService(new HttpClient(null)))).toBeTruthy();
  });
});
