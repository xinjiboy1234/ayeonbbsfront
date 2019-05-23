import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostlistComponent } from './user-postlist.component';

describe('UserPostlistComponent', () => {
  let component: UserPostlistComponent;
  let fixture: ComponentFixture<UserPostlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
