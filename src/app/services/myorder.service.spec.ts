import { TestBed } from '@angular/core/testing';

import { MyorderService } from './myorder.service';

describe('MyorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyorderService = TestBed.get(MyorderService);
    expect(service).toBeTruthy();
  });
});
