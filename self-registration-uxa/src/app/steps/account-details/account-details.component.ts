import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.less']
})
export class AccountDetailsComponent implements OnInit {

  @Input() data: any;
  @Input() submitted: boolean;
  @Output() validChange = new EventEmitter<boolean>();

  detailsForm: FormGroup;

  get signinType(): string {
    return this.detailsForm.get('signinType').value;
  }

  set signinType(value: string) {
    this.detailsForm.setValue({ 'signinType': value });
  }

  constructor(private _formBuilder: FormBuilder) {

    this.detailsForm = this._formBuilder.group({
      signinType: ['account', Validators.required],
      account: this._formBuilder.group({
        id: [''],
        password: [''],
        passwordConfirm: [''],
      })
    }, this.validateAccountDetails);
  }

  ngOnInit() {

    this.validChange.emit(this.detailsForm.valid);

    this.detailsForm.statusChanges.subscribe((next) => this.validChange.emit(next === 'VALID'));

    this.detailsForm.valueChanges.subscribe((next) => this.data.account = next);
  }

  hasError(fieldName: string): boolean {
    const field = this.detailsForm.get(fieldName);
    return field.invalid && (field.dirty || field.touched || this.submitted);
  }

  validateAccountDetails(formGroup: FormGroup): any {
    return null;
  }
}
