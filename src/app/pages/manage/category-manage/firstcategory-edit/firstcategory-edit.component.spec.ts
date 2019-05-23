import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstcategoryEditComponent } from './firstcategory-edit.component';

describe('FirstcategoryEditComponent', () => {
  let component: FirstcategoryEditComponent;
  let fixture: ComponentFixture<FirstcategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstcategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstcategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
