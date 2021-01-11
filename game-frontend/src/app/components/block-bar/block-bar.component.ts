import {Component, Injectable, OnInit} from '@angular/core';
import {BlockFactory} from '../../model/blocks/BlockFactory';
import {GameService} from '../../service/game.service';
import {Block} from '../../model/blocks/block';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-block-bar',
  templateUrl: './block-bar.component.html',
  styleUrls: ['./block-bar.component.css']
})
export class BlockBarComponent implements OnInit {
  private blockFactory: BlockFactory;
  constructor(public gameService: GameService) {
    this.gameService.initAvailableBlocks();
    this.blockFactory = new BlockFactory();
  }
  ngOnInit(): void {
  }
  selectBlock(blockStr: Block): void {
   this.gameService.selectedBlock = blockStr;
  }
}
