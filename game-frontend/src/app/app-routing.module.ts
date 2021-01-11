import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './components/map/map.component';
import {MenuComponent} from './components/menu/menu.component';
import {ScoreBarComponent} from './components/score-bar/score-bar.component';
import {PopUpComponent} from './components/pop-up/pop-up.component';
import {BlockBarComponent} from './components/block-bar/block-bar.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {EndGamePopUpComponent} from './components/end-game-pop-up/end-game-pop-up.component';
import {UndoRedoComponent} from './undo-redo/undo-redo.component';
import {ReplayComponent} from './components/replay/replay.component';

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'endGame', component: EndGamePopUpComponent},
  {path: 'replay', component: ReplayComponent},
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
