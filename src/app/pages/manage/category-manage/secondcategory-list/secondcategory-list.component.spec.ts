import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondcategoryListComponent } from './secondcategory-list.component';

describe('SecondcategoryListComponent', () => {
  let component: SecondcategoryListComponent;
  let fixture: ComponentFixture<SecondcategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondcategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
