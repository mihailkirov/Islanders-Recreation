import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild, OnDestroy} from '@angular/core';
import {GameService} from '../../service/game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.css']
})
export class ScoreBarComponent implements OnInit, OnDestroy {

  @Input() percentage: number;
  strokeDasharray: string;
  color: string;
  @ViewChild('circle')
  circle: ElementRef<HTMLButtonElement>;
  private subscription: Subscription;
  constructor(public gameService: GameService, private renderer: Renderer2) {
    this.percentage = 0;
    this.color = 'white';
    this.subscription = gameService.scoreProvider
      .subscribe((value: number) => {
      this.onDataUpdate(value);
    });
  }
  onDataUpdate(data: number): void {
    this.percentage = parseInt(((data - this.gameService.game.nextScoreToReach + 10) / 10 * 100)
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

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription
      .unsubscribe();
  }

}
