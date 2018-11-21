import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemCategoriesService } from '../item-categories.service';
import { SearchResultsService } from '../search-results.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identity-search',
  templateUrl: './identity-search.component.html',
  styleUrls: ['./identity-search.component.scss']
})
export class IdentitySearchComponent implements OnInit, OnDestroy  {

  constructor(private itemCategoriesService: ItemCategoriesService,
              private searchResultsService: SearchResultsService,
              private route: ActivatedRoute,
              private router: Router ) { }

  searchForExternal = false;
  showResults = false;
  sub: any;

  itemCategories = [];
  allResults = [];
  allHeaders = [];
  identityHeaders = [];
  locationHeaders = [];
  organisationHeaders = [];

  searchForm = new FormGroup({
    searchFor : new FormControl('', Validators.required ),
    itemCategory: new FormControl(''),
    searchTerm: new FormControl(''),
    expression: new FormControl('')
  });

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => this.searchForExternal = v.searchForExternal);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  searchForChanged(val: any) {
    console.log(val);

    const allItemCategories = this.itemCategoriesService.getItemCategories();

    this.itemCategories = allItemCategories[val];
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.showResults = true;
    console.warn(this.searchForm.value);
    if (this.searchForm.value.searchFor === 'Application') {
      this.allResults = this.searchResultsService.getApplicationSearchResults();
      this.allHeaders = this.searchResultsService.getApplicationHeaders('all');
      this.identityHeaders = this.searchResultsService.getApplicationHeaders('identity');
      this.locationHeaders = this.searchResultsService.getApplicationHeaders('location');
      this.organisationHeaders = this.searchResultsService.getApplicationHeaders('organisation');
    }

    if (this.searchForm.value.searchFor === 'Building') {
      this.allResults = this.searchResultsService.getBuildingSearchResults();
      this.allHeaders = this.searchResultsService.getBuildingHeaders('all');
      this.identityHeaders = this.searchResultsService.getBuildingHeaders('identity');
      this.locationHeaders = this.searchResultsService.getBuildingHeaders('location');
      this.organisationHeaders = this.searchResultsService.getBuildingHeaders('organisation');
    }

    if (this.searchForm.value.searchFor === 'User') {
      this.allResults = this.searchResultsService.getUserSearchResults();
      this.allHeaders = this.searchResultsService.getUserHeaders('all');
      this.identityHeaders = this.searchResultsService.getUserHeaders('identity');
      this.locationHeaders = this.searchResultsService.getUserHeaders('location');
      this.organisationHeaders = this.searchResultsService.getUserHeaders('organisation');
    }

    if (this.searchForm.value.searchFor === 'External User') {
      this.allResults = this.searchResultsService.getExternalUserSearchResults();
      this.allHeaders = this.searchResultsService.getExternalUserHeaders('all');
      this.identityHeaders = this.searchResultsService.getExternalUserHeaders('identity');
      this.locationHeaders = this.searchResultsService.getExternalUserHeaders('location');
      this.organisationHeaders = this.searchResultsService.getExternalUserHeaders('organisation');
    }

    if (this.searchForm.value.searchFor === 'Partner') {
      this.allResults = this.searchResultsService.getPartnerSearchResults();
      this.allHeaders = this.searchResultsService.getPartnerHeaders('all');
      this.identityHeaders = this.searchResultsService.getPartnerHeaders('identity');
      this.locationHeaders = this.searchResultsService.getPartnerHeaders('location');
      this.organisationHeaders = this.searchResultsService.getPartnerHeaders('organisation');
    }

  }
}
