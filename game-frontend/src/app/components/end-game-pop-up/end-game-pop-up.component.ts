import {Component, OnInit} from '@angular/core';
import {GameService} from '../../service/game.service';
import {PopUpComponent} from '../pop-up/pop-up.component';
import {OverlayService} from '../../service/overlay.service';
import {MatCard} from '@angular/material/card';
import {Router} from '@angular/router';

@Component({
  selector: 'app-end-game-pop-up',
  templateUrl: './end-game-pop-up.component.html',
  styleUrls: ['./end-game-pop-up.component.css']
})
export class EndGamePopUpComponent implements OnInit {


  constructor(public gameService: GameService, private overlay: OverlayService,
              private routeur: Router) {
  }

  /**
   * Show the top 5 results of the map
   */
  showTopFive(): void {
    this.gameService.showScore = true;
    this.gameService.showReplay = false;
    this.overlay
      .open(PopUpComponent, true);
  }

  saveReplay(): void {
    if (this.gameService.game.playerName === undefined) {
      confirm(' To save replay of current game you must first choose a Player name');
    } else {
      this.gameService.postReplay(this.gameService.game.playerName, this.gameService.game.map.name);
    }
  }

  close(): void {
    window.location.reload();
  }

  ngOnInit(): void {


  }

}
