import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.less'],
})
export class GenerateCodeComponent implements OnInit {

  @Input() data: any;
  @Input() submitted: boolean;
  @Output() validChange = new EventEmitter<boolean>();

  requested: boolean = false;

  codeForm: FormGroup;

  get codeField(): AbstractControl {
    return this.codeForm.get('code');
  }

  constructor(private _formBuilder: FormBuilder) {

    this.codeForm = this._formBuilder.group({
      code: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.validChange.emit(this.codeForm.valid);

    this.codeForm.statusChanges.subscribe((next) => this.validChange.emit(next === 'VALID'));

    this.codeForm.valueChanges.subscribe((next) => this.data.code = next);
  }

  request() {
    this.requested = true;
  }

  hasError(fieldName: string): boolean {
    const field = this.codeForm.get(fieldName);
    return field.invalid && (field.dirty || field.touched || this.submitted);
  }
}
