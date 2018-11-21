import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoriesService {

  constructor() { }

  getItemCategories() {
    return {
      'Application': [
        'Application Name', 'Application ID', 'VAPS ID', 'BAM', 'Application Owner',
        'Application Accounts', 'Associated Partners', 'Assigned Users'],
      'Building': [
        'Building Code', 'Abbreviation', 'Building Name', 'City or locality',
        'State or province', 'Country'],
      'User': [
        'CDSID', 'First Name', 'Last Name', 'Middle Initials', 'Global ID', 'Manager',
        'Reports To (CDSID)', 'Sponsor', 'Sponsor ID', 'Agency Expire Date', 'Employee Type',
        'Job Title'],
      'External User': [
        'CDSID', 'First Name', 'Last Name', 'Middle Initials', 'Global ID', 'Manager',
        'Reports To (CDSID)', 'Sponsor', 'Sponsor ID', 'Agency Expire Date', 'Employee Type',
        'Job Title'],
      'Partner': [
        'CDSID', 'First Name', 'Last Name', 'Middle Initials', 'Global ID', 'Manager',
        'Reports To (CDSID)', 'Sponsor', 'Sponsor ID', 'Agency Expire Date', 'Employee Type',
        'Job Title']
  };
}
}
