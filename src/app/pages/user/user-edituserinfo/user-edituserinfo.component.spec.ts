import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEdituserinfoComponent } from './user-edituserinfo.component';

describe('UserEdituserinfoComponent', () => {
  let component: UserEdituserinfoComponent;
  let fixture: ComponentFixture<UserEdituserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEdituserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEdituserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
