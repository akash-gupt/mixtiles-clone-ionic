import { TestBed } from '@angular/core/testing';

import { IgLoginService } from './ig-login.service';

describe('IgLoginService', () => {
  let service: IgLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
