import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../service/game.service';
import {Router} from '@angular/router';
import {MatInput} from '@angular/material/input';
import {OverlayService} from '../../service/overlay.service';
import {RandomMapBuilder} from '../../model/map/builder/RandomMapBuilder';
import {LoadMapBuilder} from '../../model/map/builder/LoadMapBuilder';
import {ReplayComponent} from '../replay/replay.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  availableMaps: Array<string>;
  availableReplays: Array<string>;
  show: boolean;
  /* HTML elements */
  isDisabled: boolean;
  @ViewChild('playerName')
  playerName: ElementRef<MatInput>;

  constructor(private gameService: GameService, private router: Router,
              protected overlay: OverlayService) {
    this.show = false;
    this.isDisabled = true;
    this.availableMaps = new Array<string>();
    this.availableReplays = new Array<string>();
  }

  ngOnInit(): void {
    this.gameService
      .getMapNames()
      .then(data => {
        this.isDisabled = false;
        this.show = true;
        this.availableMaps = data;
    }, error => {
        throw new Error(error);
      }).catch(Error);

  }

  randomMap(): void {
    if (this.show) { //  if server is on
      this.gameService.getRandomMap()
        .then(
          map => {
            this.gameService
              .resetGame();
            this.gameService.game.map = LoadMapBuilder.create()
            .addMap(map)
            .setWidth(map.width)
            .build();
            this.router
              .navigateByUrl('/map')
              .then();
      }, error => {
        throw new Error(error);
        })
        .catch(Error);
    } else {
      // Generate random Map using the frontend logic
      this.gameService
        .resetGame();
      this.gameService.game.map = RandomMapBuilder
        .create()
        .setWidth(10)
        .build();
      this.router
        .navigateByUrl('/map')
        .then();
    }
  }

  loadedMap(param: string): void {
    this.gameService
      .loadMap(param)
      .then(
        map => {
          console.log(map);
          this.gameService
            .resetGame();
          this.gameService.game.map = LoadMapBuilder.create()
            .addMap(map)
            .setWidth(map.width)
            .build();
          this.router.navigateByUrl('/map');
      }, error => {
        throw new Error(error);
      })
      .catch(Error);
  }

  replayPlayer($event: KeyboardEvent): void {
    if ($event.key === 'Enter' && this.playerName.nativeElement.value !== ''){
      this.availableReplays = [];
      const tmpName: string = this.playerName.nativeElement.value;
      this.gameService
        .getReplaysMapNames(tmpName)
        .then(names => {
        this.availableReplays = names;
      }, error => {
          throw new Error(error);
        }).catch(Error);
    }
  }

  chooseReplay(map: string): void {
    this.gameService
      .getReplay(this.playerName.nativeElement.value, map)
      .then(res => {
          this.gameService.receivedReplay = res;
          this.gameService.game.map = LoadMapBuilder.create()
            .addMap(res.map)
            .setWidth(res.map.width)
            .build();
          this.gameService.animateReplay();
          this.overlay.open(ReplayComponent, true);
        }, error => {
          throw new Error(error);
        }
      )
      .catch(Error);
  }
}
