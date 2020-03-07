import { TestBed } from '@angular/core/testing';

import { SelectPeopleService } from './select-people.service';

describe('SelectPeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectPeopleService = TestBed.get(SelectPeopleService);
    expect(service).toBeTruthy();
  });
});
