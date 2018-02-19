import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './date-input/date-input.component';
import { SelectModule } from '@ux-aspects/ux-aspects';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
  ],
  declarations: [DateInputComponent],
  exports: [DateInputComponent]
})
export class ComponentsModule { }
