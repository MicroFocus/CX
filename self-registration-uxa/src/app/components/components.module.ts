import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from '@ux-aspects/ux-aspects';
import { DateInputComponent } from './date-input/date-input.component';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
  ],
  declarations: [DateInputComponent],
  exports: [DateInputComponent]
})
export class ComponentsModule { }
