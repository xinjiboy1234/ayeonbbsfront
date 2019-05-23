import { TestBed } from '@angular/core/testing';

import { SecondcategoryService } from './secondcategory.service';

describe('SecondcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecondcategoryService = TestBed.get(SecondcategoryService);
    expect(service).toBeTruthy();
  });
});
