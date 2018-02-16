import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SelfRegistrationComponent } from './self-registration.component';
import { WizardModule } from '@ux-aspects/ux-aspects';
import { StepsModule } from '../steps/steps.module';

@NgModule({
  imports: [
    CommonModule,
    WizardModule,
    StepsModule,
  ],
  declarations: [
    SelfRegistrationComponent,
  ]
})
export class SelfRegistrationModule { }
