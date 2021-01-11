import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../service/game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
  styleUrls: ['./undo-redo.component.css']
})
export class UndoRedoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('Undo')
  undoButton: ElementRef<HTMLButtonElement>;
  @ViewChild('Redo')
  redoButton: ElementRef<HTMLButtonElement>;
  @ViewChild('Replace')
  replaceButton: ElementRef<HTMLButtonElement>;
  private subscriptionReplaceButton: Subscription;
  public availableReplace = 1;
  private isClicked: boolean;
  constructor(private gameService: GameService) {
    this.subscriptionReplaceButton = this.gameService.availableReplacesProvider
      .subscribe((replays: number) => {
        if (replays === 0) {
          this.replaceButton.nativeElement.style.backgroundColor = '#555';
        } else if (this.availableReplace === 0 && replays > 0) {
          this.replaceButton.nativeElement.style.backgroundColor = '#00c800';
        }
        this.availableReplace = replays;
      });
    this.isClicked = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptionReplaceButton.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.redoButton.nativeElement
      .addEventListener('click', () => {
        if (this.isClicked) {
          this.isClicked =  !this.isClicked;
          this.gameService.replaceStateProvider
            .next(this.isClicked);
        }
        this.gameService.game.collectorRedo();
      });
    this.undoButton.nativeElement
      .addEventListener('click', () => {
        if (this.isClicked) {
          this.isClicked = !this.isClicked;
          this.gameService.replaceStateProvider
            .next(this.isClicked);
        }
        this.gameService.game.collectorUndo();
      });
    this.replaceButton.nativeElement.addEventListener('click', () => {
      this.isClicked = !this.isClicked;
      this.gameService.replaceStateProvider.next(this.isClicked);
    });
  }

}
