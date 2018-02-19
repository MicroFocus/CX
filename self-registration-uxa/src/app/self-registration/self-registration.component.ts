import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SelfRegistrationComponent {

  data = {};

  currentStep: number;

  stepStates: StepState[] = [];

  constructor(private _router: Router) {
    for (let i = 0; i < 4; i++) {
      this.stepStates.push(new StepState());
    }
  }

  cancel() {}

  onStepChanging(stepIndex: number) {

    // Mark the step as submitted before leaving. Used to trigger validation warnings, if any.
    this.stepStates[stepIndex].submitted = true;
  }
}

class StepState {
  submitted: boolean = false;
  valid: boolean = false;
}
