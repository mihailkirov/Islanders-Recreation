import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Replay} from '../../model/moves/replay';
import {Subscription} from 'rxjs';
import {GameService} from '../../service/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent implements OnInit {
  lastReplayIndex: number; // for pause feature
  running: boolean;
  private timeout;
  replayToShow: Replay;


  // Sadly we cannot reuse the score bar component since it would update the score bar behind the popUp too
  public currentReplayScore: number;
  private currentReplayScoreSubscriber: Subscription;
  public nextReplayScoreToReach: number;
  private readonly scoreIncrement: number;

  @Input() percentage: number;
  strokeDasharray: string;
  color: string;

  @ViewChild('pausePlay') pauseImg: ElementRef<HTMLButtonElement>;
  @ViewChild('PauseButton', {read: ElementRef}) pauseButton: ElementRef<HTMLButtonElement>;


  constructor(public gameService: GameService, public router: Router, private renderer: Renderer2) {
    this.currentReplayScore = 0;
    this.nextReplayScoreToReach = 10;
    this.scoreIncrement = 10;
    this.currentReplayScoreSubscriber = this.gameService.replayScoreProvider
      .subscribe((value: number) => {
        this.onDataUpdate(value);
      });
    this.percentage = 0;
    this.color = 'white';

    if (this.gameService.receivedReplay !== undefined && this.gameService.showReplay) {
      const length = this.gameService.movesToAnimate.length;
      this.lastReplayIndex = 0;
      this.running = true;
      this.timeout = setTimeout(() => this.animate(length), 1000);
    }
  }


  onDataUpdate(data: number): void {

    this.currentReplayScore += data;

    // Update the score bar
    while (this.currentReplayScore >= this.nextReplayScoreToReach) {
      this.nextReplayScoreToReach += this.scoreIncrement;
    }
    this.percentage = parseInt(((this.currentReplayScore - this.nextReplayScoreToReach + this.scoreIncrement)
      / this.scoreIncrement * 100)
      .toFixed(2), null);

    this.strokeDasharray = this.percentage + ', 100';
    if (this.percentage < 75) {
      this.color = 'skyblue';
      if (this.percentage < 50) {
        this.color = 'orange';
        if (this.percentage < 25) {
          this.color = 'indianred';

        }
      }
    } else {
      this.color = 'lightgreen';
    }
  }

  // Replay methods
  pause(): void {
    if (this.running) {
      this.pauseButton.nativeElement.setAttribute('title', 'Resume replay');
      this.pauseImg.nativeElement.setAttribute('src', 'assets/play_circle-black-48dp.svg');
      clearTimeout(this.timeout);
    } else {
      this.pauseButton.nativeElement.setAttribute('title', 'Pause replay animation');
      this.pauseImg.nativeElement.setAttribute('src', 'assets/pause_circle-black-48dp.svg');
      this.timeout = setTimeout(() => this.animate(this.gameService.movesToAnimate.length), 1000);

    }
    this.running = !this.running;
  }

  animate(length: number): void {
    if (this.lastReplayIndex < length) {
      // Animate and get the points for the replay
      this.gameService.replayScoreProvider.next(this.gameService.movesToAnimate[this.lastReplayIndex++].execute());

      // Wait 1 sec before next replay animation
      this.timeout = setTimeout(() => this.animate(length), 1000);
    }
  }

  reload(): void {
    this.gameService.game.map.clearForReplay();

    const length = this.gameService.movesToAnimate.length;
    this.percentage = 0;
    this.color = 'white';
    this.lastReplayIndex = 0;
    this.currentReplayScore = 0;
    this.nextReplayScoreToReach = 10;
    this.running = true;
    this.timeout = setTimeout(() => this.animate(length), 1000);
    this.pauseButton.nativeElement.setAttribute('title', 'Pause replay animation');
    this.pauseImg.nativeElement.setAttribute('src', 'assets/pause_circle-black-48dp.svg');


  }

  goBack(): void {
    clearTimeout(this.timeout);
    this.gameService.game.map.clearForReplay();
    this.router.navigateByUrl(`/map`).then();
  }

  ngOnInit(): void {
  }

}
