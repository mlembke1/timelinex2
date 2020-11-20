import { TestBed } from '@angular/core/testing';

import { PnPBaseService } from './pnp-base-service.service';

describe('PnPBaseService', () => {
  let service: PnPBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnPBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
