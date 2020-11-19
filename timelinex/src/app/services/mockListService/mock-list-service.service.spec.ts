import { TestBed } from '@angular/core/testing';

import { MockListService } from './mock-list-service.service';

describe('MockListService', () => {
  let service: MockListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
