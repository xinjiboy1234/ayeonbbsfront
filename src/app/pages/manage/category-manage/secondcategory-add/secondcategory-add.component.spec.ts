import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondcategoryAddComponent } from './secondcategory-add.component';

describe('SecondcategoryAddComponent', () => {
  let component: SecondcategoryAddComponent;
  let fixture: ComponentFixture<SecondcategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondcategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondcategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
