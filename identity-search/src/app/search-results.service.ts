import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  constructor() { }

  getApplicationHeaders(searchFor) {
    if (searchFor === 'identity') {
      return ['Application name', 'Application ID'];
    }
    if (searchFor === 'location') {
      return ['Application name'];
    }
    if (searchFor === 'organisation') {
      return ['Application name'];
    }
    return ['Application name', 'Application ID'];
  }
  getApplicationSearchResults() {
    return [{ 'Application name': 'AAA', 'Application ID': 'AAA ID' },
    { 'Application name': 'BBB', 'Application ID': 'BBB ID' },
    { 'Application name': 'CCC', 'Application ID': 'CCC ID' }];
  }

  getPartnerHeaders(searchFor) {
    if (searchFor === 'identity') {
      return ['Partner name', 'Partner ID'];
    }
    if (searchFor === 'location') {
      return ['Partner name'];
    }
    if (searchFor === 'organisation') {
      return ['Partner name'];
    }
    return ['Partner name', 'Partner ID'];
  }
  getPartnerSearchResults() {
    return [{ 'Partner name': 'Partner AAA', 'Partner ID': 'Partner AAA ID' },
    { 'Partner name': 'Partner BBB', 'Partner ID': 'Partner BBB ID' },
    { 'Partner name': 'Partner CCC', 'Partner ID': 'Partner CCC ID' }];
  }

  getExternalUserHeaders(searchFor) {
    if (searchFor === 'identity') {
      return ['External User name', 'External User ID'];
    }
    if (searchFor === 'location') {
      return ['External User name'];
    }
    if (searchFor === 'organisation') {
      return ['External User name'];
    }
    return ['External User name', 'External User ID'];
  }
  getExternalUserSearchResults() {
    return [{ 'External User name': 'External AAA', 'External User ID': 'External AAA ID' },
    { 'External User name': 'External BBB', 'External User ID': 'External BBB ID' },
    { 'External User name': 'External CCC', 'External User ID': 'External CCC ID' }];
  }

  getBuildingHeaders(searchFor) {
    if (searchFor === 'identity') {
      return ['Building name', 'Building ID'];
    }
    if (searchFor === 'location') {
      return ['Building name'];
    }
    if (searchFor === 'organisation') {
      return ['Building name'];
    }
    return ['Building name', 'Building ID'];
  }
  getBuildingSearchResults() {
    return [{ 'Building name': 'Building AAA', 'Building ID': 'Building AAA ID' },
    { 'Building name': 'Building BBB', 'Building ID': 'Building BBB ID' },
    { 'Building name': 'Building CCC', 'Building ID': 'Building CCC ID' }];
  }

  getUserHeaders(searchFor) {
    if (searchFor === 'identity') {
      return ['User name', 'User ID'];
    }
    if (searchFor === 'location') {
      return ['User name'];
    }
    if (searchFor === 'organisation') {
      return ['User name'];
    }
    return ['User name', 'User ID'];
  }
  getUserSearchResults() {
    return [{ 'User name': 'User AAA', 'User ID': 'User AAA ID' },
    { 'User name': 'User BBB', 'User ID': 'User BBB ID' },
    { 'User name': 'User CCC', 'User ID': 'User CCC ID' }];
  }
}
