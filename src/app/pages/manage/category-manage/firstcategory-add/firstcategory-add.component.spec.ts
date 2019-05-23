import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstcategoryAddComponent } from './firstcategory-add.component';

describe('FirstcategoryAddComponent', () => {
  let component: FirstcategoryAddComponent;
  let fixture: ComponentFixture<FirstcategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstcategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstcategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
