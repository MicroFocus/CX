import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import _ = require('lodash');

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  private _value: Date;

  @Input()
  get value(): Date {
    return this._value;
  }
  set value(value: Date) {
    this._value = value;
    this.setViewFromValue(value);
    this.valueChange.emit(value);
    this.onChange(value);
  }

  @Output() valueChange = new EventEmitter<Date>();

  private _year: string;
  get year(): string {
    return this._year;
  }
  set year(value: string) {
    this._year = value;
    this.updateValue();
  }

  private _month: DateComponent;
  get month(): DateComponent {
    return this._month;
  }
  set month(value: DateComponent) {
    this._month = value;
    this.updateValue();
  }

  private _day: string;
  get day(): string {
    return this._day;
  }
  set day(value: string) {
    this._day = value;
    this.updateValue();
  }

  disabled: boolean;
  onChange: any;
  onTouched: any;

  days = _.range(1, 31).map(day => day.toString());
  months = moment.monthsShort().map((month, i) => ({ name: month, value: i }));
  years = _.range(1900, moment().year())
    .reverse()
    .map(year => year.toString());

  writeValue(obj: any) {
    if (obj instanceof Date) {
      this.setViewFromValue(<Date>obj);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private updateValue(): any {
    if (this.year && this.month && this.day) {
      const m = moment([this.year, this.month.value, this.day]);
      if (m.isValid()) {
        this.value = m.toDate();
      }
    }
  }

  private setViewFromValue(date: Date) {
    this._year = date.getFullYear().toString();
    this._month = this.months.find(v => v.value === date.getMonth());
    this._day = date.getDate().toString();
  }
}

interface DateComponent {
  name: string;
  value: number;
}
