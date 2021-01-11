import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {OverlayModule} from '@angular/cdk/overlay';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MenuComponent} from './components/menu/menu.component';
import {ScoreBarComponent} from './components/score-bar/score-bar.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockBarComponent } from './components/block-bar/block-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EndGamePopUpComponent } from './components/end-game-pop-up/end-game-pop-up.component';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule} from '@angular/material/card';
import { DialogForNameComponent } from './components/dialogs/dialog-for-name/dialog-for-name.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogForMapComponent } from './components/dialogs/dialog-for-map/dialog-for-map.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { UndoRedoComponent } from './undo-redo/undo-redo.component';
import { ReplayComponent } from './components/replay/replay.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    ScoreBarComponent,
    PopUpComponent,
    BlockBarComponent,
    WelcomeComponent,
    EndGamePopUpComponent,
    UndoRedoComponent,
    DialogForNameComponent,
    DialogForMapComponent,
    ReplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    OverlayModule,
    MatListModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
