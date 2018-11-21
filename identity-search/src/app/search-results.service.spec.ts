import { TestBed } from '@angular/core/testing';

import { SearchResultsService } from './search-results.service';

describe('SearchResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchResultsService = TestBed.get(SearchResultsService);
    expect(service).toBeTruthy();
  });
});
