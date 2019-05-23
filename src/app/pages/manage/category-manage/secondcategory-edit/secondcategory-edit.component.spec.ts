import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondcategoryEditComponent } from './secondcategory-edit.component';

describe('SecondcategoryEditComponent', () => {
  let component: SecondcategoryEditComponent;
  let fixture: ComponentFixture<SecondcategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondcategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondcategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
