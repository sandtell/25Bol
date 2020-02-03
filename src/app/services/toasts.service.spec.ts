import { TestBed } from '@angular/core/testing';

import { ToastsService } from './toasts.service';

describe('ToastsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastsService = TestBed.get(ToastsService);
    expect(service).toBeTruthy();
  });
});
