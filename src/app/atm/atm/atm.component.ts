import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { AtmService } from '../atm.service';
import { StepFiveComponent } from './step-five/step-five.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepTwoComponent } from './step-two/step-two.component';

type CurrentStep =
  | StepOneComponent
  | StepTwoComponent
  | StepThreeComponent
  | StepFourComponent
  | StepFiveComponent;

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss'],
})
export class AtmComponent implements OnInit, AfterViewInit {
  @ViewChild('stepOneComponent') stepOneComponent: StepOneComponent;
  @ViewChild('stepTwoComponent') stepTwoComponent: StepTwoComponent;
  @ViewChild('stepThreeComponent') stepThreeComponent: StepThreeComponent;
  @ViewChild('stepFourComponent') stepFourComponent: StepFourComponent;
  @ViewChild('stepFiveComponent') stepFiveComponent: StepFiveComponent;

  steps: CurrentStep[] = [];
  currentStep: CurrentStep;

  constructor(private cdr: ChangeDetectorRef, private atmService: AtmService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.steps = [
      this.stepOneComponent,
      this.stepTwoComponent,
      this.stepThreeComponent,
      this.stepFourComponent,
      this.stepFiveComponent,
    ];
    this.currentStep = this.stepOneComponent;
    this.cdr.detectChanges();
  }

  next() {
    if (this.currentStep?.isValid()) {
      const result = this.currentStep.submit();
      if (result.success) {
        if (!!result.goToStepIndex) {
          this.goToNthStep(result.goToStepIndex);
        } else {
          this.goToNextStep();
        }
      } else {
        this.goToFinalStep();
      }
    }
  }

  startOver(): void {
    this.currentStep.submit();
    this.currentStep = this.steps[0];
    this.stepOneComponent.form.reset();
    this.stepTwoComponent.form.reset();
    this.stepThreeComponent.form.reset();
    this.stepFourComponent.form.reset();
  }

  goToNextStep(): void {
    const indexOfPrevStep = this.steps.findIndex(
      (s) => s.index === this.currentStep.index
    );
    if (indexOfPrevStep + 1 > this.steps.length) {
      return;
    }
    this.currentStep = this.steps[indexOfPrevStep + 1];
  }

  goToFinalStep(): void {
    this.currentStep = this.steps[this.steps.length - 1];
  }

  goToNthStep(stepIndex): void {
    this.currentStep = this.steps[stepIndex];
  }

  cancel() {
    this.currentStep = this.steps[0];
  }

  get isValid(): boolean {
    return this.currentStep?.isValid();
  }

  get currentAmount(): number {
    return this.atmService.currentAmount;
  }

  get currentPin(): number {
    return this.atmService.currentPin;
  }
}
