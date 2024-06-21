import { TestBed } from '@angular/core/testing';

import { ConverseService } from './converse.service';

describe('ConverseService', () => {
  let service: ConverseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
