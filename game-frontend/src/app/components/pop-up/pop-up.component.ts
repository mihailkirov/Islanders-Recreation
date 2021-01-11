import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../service/game.service';
import {Replay} from '../../model/moves/replay';
import {Subscription} from 'rxjs';
import {MatTable} from '@angular/material/table';


export interface PlayerScore {
  position: number;
  name: string;
  score: number;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input() _scoresMap: Map<string, number>;


  @ViewChild('table') table: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'score'];
  playersData: PlayerScore[] = [];




  get scoresMap(): Map<string, number> {
    return this._scoresMap;
  }

  set scoresMap(value: Map<string, number>) {
    this._scoresMap = value;
  }

  // @Todo communication with the menu component to get name of the map
  constructor(public gameService: GameService) {
    this._scoresMap = new Map<string, number>();

    let i = 1;
    gameService.getTop5Score(gameService.game.map.name)
      .then(res => {
        console.log(res);
        Object.keys(res)
          .forEach(key => {
            this._scoresMap
              .set(key, res[key]);
            const p: PlayerScore = {position: i, name: key, score: res[key]};
            this.playersData.push(p);
            i++;
          });
        this.table.renderRows();
      });
  }



  // TODO Fix the CSS of this component to have a nice visual

  ngOnInit(): void {
  }

}
