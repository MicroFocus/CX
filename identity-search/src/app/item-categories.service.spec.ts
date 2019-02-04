import { TestBed } from '@angular/core/testing';

import { ItemCategoriesService } from './item-categories.service';

describe('ItemCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCategoriesService = TestBed.get(ItemCategoriesService);
    expect(service).toBeTruthy();
  });
});
