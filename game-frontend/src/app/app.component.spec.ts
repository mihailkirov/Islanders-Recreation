import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GameService} from './service/game.service';
import {OverlayService} from './service/overlay.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppRoutingModule} from './app-routing.module';
import {OverlayModule} from '@angular/cdk/overlay';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, HttpClientTestingModule, AppRoutingModule],
      providers: [OverlayService, GameService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
