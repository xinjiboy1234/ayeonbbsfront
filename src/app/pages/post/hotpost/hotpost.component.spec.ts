import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotpostComponent } from './hotpost.component';

describe('HotpostComponent', () => {
  let component: HotpostComponent;
  let fixture: ComponentFixture<HotpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
