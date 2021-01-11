import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForNameComponent } from './dialog-for-name.component';

describe('DialogForNameComponent', () => {
  let component: DialogForNameComponent;
  let fixture: ComponentFixture<DialogForNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogForNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
