import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {GameService} from '../../service/game.service';
import {OverlayService} from '../../service/overlay.service';
import {AppRoutingModule} from '../../app-routing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OverlayModule} from '@angular/cdk/overlay';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [ OverlayModule, HttpClientTestingModule, AppRoutingModule ],
      providers: [ OverlayService, GameService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
