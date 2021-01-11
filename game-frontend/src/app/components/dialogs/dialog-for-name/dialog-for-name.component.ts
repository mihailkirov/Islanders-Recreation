import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {GameService} from '../../../service/game.service';

@Component({
  selector: 'app-dialog-for-name',
  templateUrl: './dialog-for-name.component.html',
  styleUrls: ['./dialog-for-name.component.css']
})
export class DialogForNameComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogForNameComponent>,
    public gameService: GameService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
