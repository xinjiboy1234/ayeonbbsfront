import { TestBed } from '@angular/core/testing';

import { ReplyserviceService } from './replyservice.service';

describe('ReplyserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReplyserviceService = TestBed.get(ReplyserviceService);
    expect(service).toBeTruthy();
  });
});
