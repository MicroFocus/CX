import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-identity-results',
  templateUrl: './identity-results.component.html',
  styleUrls: ['./identity-results.component.scss']
})
export class IdentityResultsComponent {
  @Input() tabResults;
  @Input() headerIdentityResults;
  @Input() headerLocationResults;
  @Input() headerOrganisationResults;
  @Input() headerAllResults;

  constructor() { }


}
