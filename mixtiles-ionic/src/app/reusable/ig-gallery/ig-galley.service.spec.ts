import { TestBed } from '@angular/core/testing';

import { IgGalleyService } from './ig-galley.service';

describe('IgGalleyService', () => {
  let service: IgGalleyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgGalleyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
