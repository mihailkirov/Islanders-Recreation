import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockBarComponent } from './block-bar.component';

describe('BlockBarComponent', () => {
  let component: BlockBarComponent;
  let fixture: ComponentFixture<BlockBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
