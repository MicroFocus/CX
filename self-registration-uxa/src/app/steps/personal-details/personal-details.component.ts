import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import * as moment from 'moment';
import _ = require('lodash');

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.less'],
})
export class PersonalDetailsComponent implements OnInit {

  @Input() data: any;
  @Input() submitted: boolean;
  @Output() validChange = new EventEmitter<boolean>();

  days = _.range(1, 31).map((day) => ({ name: day.toString(), value: day }));
  months = moment.monthsShort().map((month, i) => ({ name: month, value: i }));
  years = _.range(1900, moment().year()).reverse().map((year) => ({ name: year.toString(), value: year }));
  offices = ['Bangalore', 'Cambridge', 'Houston', 'Provo'];

  detailsForm: FormGroup;

  get titleField(): AbstractControl {
    return this.detailsForm.get('title');
  }

  get birthDay() {
    return this.detailsForm.get('birthDate').get('day').value;
  }

  get birthMonth() {
    return this.detailsForm.get('birthDate').get('month').value;
  }

  get birthYear() {
    return this.detailsForm.get('birthDate').get('year').value;
  }

  get office(): Date {
    return this.detailsForm.get('office').value;
  }

  constructor(private _formBuilder: FormBuilder) {

    this.detailsForm = this._formBuilder.group({
      title: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      jobTitle: [''],
      email: ['', [Validators.required, Validators.email]],
      birthDate: this._formBuilder.group({
        day: '',
        month: '',
        year: '',
      }, {
        validator: this.birthDateValidator
      }),
      zip: ['', Validators.required],
      office: ['Cambridge', Validators.required],
    });
  }

  ngOnInit() {

    this.validChange.emit(this.detailsForm.valid);

    this.detailsForm.statusChanges.subscribe((next) => this.validChange.emit(next === 'VALID'));

    this.detailsForm.valueChanges.subscribe((next) => this.data.personal = next);
  }

  hasError(fieldName: string): boolean {
    const field = this.detailsForm.get(fieldName);
    return field.invalid && (field.dirty || field.touched || this.submitted);
  }

  birthDateValidator(formGroup: FormGroup) {
    return moment({
      year: formGroup.get('year').value,
      month: formGroup.get('month').value,
      day: formGroup.get('day').value
    }).isValid();
  }
}
