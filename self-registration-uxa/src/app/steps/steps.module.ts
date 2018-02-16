import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RadioButtonModule, DateTimePickerModule, SelectModule } from '@ux-aspects/ux-aspects';

import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,

    // Bootstrap
    ButtonsModule.forRoot(),
    PopoverModule.forRoot(),

    // UX Aspects
    DateTimePickerModule,
    RadioButtonModule,
    SelectModule
  ],
  exports: [GenerateCodeComponent, PersonalDetailsComponent, AccountDetailsComponent, SummaryComponent],
  declarations: [GenerateCodeComponent, PersonalDetailsComponent, AccountDetailsComponent, SummaryComponent],
  providers: []
})
export class StepsModule {}
