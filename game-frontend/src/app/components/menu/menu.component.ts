import {Component, ElementRef, OnInit, Output, EventEmitter, Renderer2, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {GameService} from '../../service/game.service';
import {OverlayService} from '../../service/overlay.service';
import {PopUpComponent} from '../pop-up/pop-up.component';
import {MapData} from '../../model/map/map-data';
import {RandomMapBuilder} from '../../model/map/builder/RandomMapBuilder';
import {MatDialog} from '@angular/material/dialog';
import {DialogForNameComponent} from '../dialogs/dialog-for-name/dialog-for-name.component';
import {DialogForMapComponent} from '../dialogs/dialog-for-map/dialog-for-map.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  MapNames: Array<string>;
  @Output() recievedMap = new EventEmitter<MapData>();

  @ViewChild('NameEntry')
  HTMLNameEntry: ElementRef<HTMLButtonElement>;
  @ViewChild('changeNameButton')
  changeNameButton: ElementRef<HTMLButtonElement>;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  constructor(private renderer: Renderer2, public gameService: GameService,
              protected overlay: OverlayService,
              public dialog: MatDialog,
              private router: Router) {
    this.gameService
      .getMapNames()
      .then(result => {
        this.MapNames = result;
      }, error => {
        console.log(error);
        throw  new Error(error);
      })
      .catch(Error);
  }

  changePlayerName(value: string): void {
    if (value !== this.gameService.game.playerName && value !== '') {
      if (confirm('Are you sure you want to change your name to ' + value)) {
        this.gameService.game.playerName = value;
        this.renderer.setAttribute(this.HTMLNameEntry.nativeElement, 'value', this.gameService.game.playerName);
        console.log('Changed player name to ' + this.gameService.game.playerName);
      }
    }
  }

  /**
   * Loading map from backend
   * @param mapName - name of the map to be loaded
   */
  chooseMap(mapName: string): void {
    this.gameService
      .loadMap(mapName)
      .then(map => {
        this.recievedMap
          .emit(map);
        this.gameService
          .resetGame();
      }, error => {
        throw  new Error(error);
      })
      .catch(Error);
  }

  openNameDialog(): void {
    const dialogRef = this.dialog.open(DialogForNameComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Name dialog was closed with result= ' + result);
      this.gameService.game.playerName = result;
      if (this.MapNames.includes(this.gameService.game.map.name)) {
        this.showLastReplay();
      }
    });
  }

  openMapDialog(): void {
    const dialogRef = this.dialog.open(DialogForMapComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gameService.game.map.name = result;
      this.chooseMap(result);
      if (this.gameService.game.playerName !== undefined) {
        this.showLastReplay();
      }
    });
  }

  showLastReplay(): void {
    if (this.gameService.game.playerName === undefined) {
      this.openNameDialog();
    }
    if (!this.MapNames.includes(this.gameService.game.map.name)) {
      this.openMapDialog();
    } else {
      this.gameService
        .getReplay()
        .then(res => {
            this.gameService.receivedReplay = res;
            this.gameService.animateReplay();
            this.router
              .navigateByUrl('/replay')
              .then();
          }, error => {
            throw new Error(error);
          }
        ).catch(Error => {
        if (this.gameService.game.playerName !== undefined) {
          confirm('Sorry there is no Replay made by yourself on ' + this.gameService.game.map.name + ' map');
        }
      });
    }
  }

  /**
   * Obtaining a new random generated map  from the backend
   */
  newRandomMap(): void {
    if (confirm('Are you sure you want a new randomMap?')) {
      console.log('New Random MapClass');
      // this.map.map.InitRandomMap();
      this.gameService.getRandomMap()
        .then(
          map => {
            this.gameService
              .resetGame();
            this.recievedMap
              .emit(map);
          }
          , error => {
            this.gameService.game.map = RandomMapBuilder.create().build();
            throw  new Error(error);
          })
        .catch(Error);
    }
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

  ngOnInit(): void {

  }

}
