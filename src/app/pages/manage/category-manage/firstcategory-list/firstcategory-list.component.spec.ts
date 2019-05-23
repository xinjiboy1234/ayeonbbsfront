import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstcategoryListComponent } from './firstcategory-list.component';

describe('FirstcategoryListComponent', () => {
  let component: FirstcategoryListComponent;
  let fixture: ComponentFixture<FirstcategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstcategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
