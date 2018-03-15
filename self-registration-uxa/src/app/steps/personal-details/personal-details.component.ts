import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.less'],
})
export class PersonalDetailsComponent implements OnInit {

  @Input() data: any;
  @Input() submitted: boolean;
  @Output() validChange = new EventEmitter<boolean>();

  offices = ['Bangalore', 'Cambridge', 'Houston', 'Provo'];

  detailsForm: FormGroup;

  get office(): string {
    return this.detailsForm.get('office').value;
  }

  constructor(private _formBuilder: FormBuilder) {

    this.detailsForm = this._formBuilder.group({
      title: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      jobTitle: [''],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
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
}
