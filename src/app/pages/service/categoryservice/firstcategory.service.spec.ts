import { TestBed } from '@angular/core/testing';

import { FirstcategoryService } from './firstcategory.service';

describe('FirstcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstcategoryService = TestBed.get(FirstcategoryService);
    expect(service).toBeTruthy();
  });
});
