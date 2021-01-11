import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForMapComponent } from './dialog-for-map.component';

describe('DialogForMapComponent', () => {
  let component: DialogForMapComponent;
  let fixture: ComponentFixture<DialogForMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogForMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
