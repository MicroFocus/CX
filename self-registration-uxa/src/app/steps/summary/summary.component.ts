import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent {
  @Input() data: any;

  get birthDate(): Date {
    if (this.data.personal && this.data.personal.birthDate) {
      return new Date(
        this.data.personal.birthDate.year.value,
        this.data.personal.birthDate.month.value,
        this.data.personal.birthDate.day.value
      );
    }
  }

  get signinImg(): string {
    if (this.data.account && this.data.account.signinType !== 'account') {
      return this._images[this.data.account.signinType];
    }
  }

  private _images = {
    google: require('../../../assets/images/google.png'),
    facebook: require('../../../assets/images/facebook.png'),
    linkedin: require('../../../assets/images/linkedin.png')
  };
}
