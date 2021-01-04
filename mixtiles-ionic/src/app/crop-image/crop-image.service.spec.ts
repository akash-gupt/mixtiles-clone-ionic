import { TestBed } from '@angular/core/testing';

import { CropImageService } from './crop-image.service';

describe('CropImageService', () => {
  let service: CropImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
