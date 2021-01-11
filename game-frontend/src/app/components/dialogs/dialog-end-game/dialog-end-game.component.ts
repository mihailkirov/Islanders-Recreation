import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {GameService} from '../../../service/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-end-game',
  templateUrl: './dialog-end-game.component.html',
  styleUrls: ['./dialog-end-game.component.css']
})
export class DialogEndGameComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<DialogEndGameComponent>,
              private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
  }

  quit(b: boolean): void {
    if (b) {
      // save the replay
      // this.gameService.storeNewScore();
      this.gameService.postReplay();
    }
    this.router.navigateByUrl('/welcome')
      .then(() => this.dialogref.close());
  }

  cancel(): void {
    this.dialogref.close();
  }
}
