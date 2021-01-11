import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {GameService} from '../../../service/game.service';
import {MapData} from '../../../model/map/map-data';

@Component({
  selector: 'app-dialog-for-map',
  templateUrl: './dialog-for-map.component.html',
  styleUrls: ['./dialog-for-map.component.css']
})
export class DialogForMapComponent implements OnInit {

  MapNames: Array<string>;
  @Output() receivedMap = new EventEmitter<MapData>();

  selectedMap: string;

  constructor(
    public dialogRef: MatDialogRef<DialogForMapComponent>,
    public gameService: GameService) {
    this.gameService
      .getMapNames()
      .then(result => {
        this.MapNames = result;
        console.log(this.MapNames);
      }, error => {
        console.log(error);
        throw  new Error(error);
      })
      .catch(Error);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
