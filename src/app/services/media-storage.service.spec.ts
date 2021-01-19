import { TestBed } from '@angular/core/testing';

import { MediaStorageService } from './media-storage.service';

describe('MediaStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaStorageService = TestBed.get(MediaStorageService);
    expect(service).toBeTruthy();
  });
});
