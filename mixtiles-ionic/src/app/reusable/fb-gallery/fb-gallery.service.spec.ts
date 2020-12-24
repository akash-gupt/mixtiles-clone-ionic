import { TestBed } from '@angular/core/testing';

import { FbGalleryService } from './fb-gallery.service';

describe('FbGalleryService', () => {
  let service: FbGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
