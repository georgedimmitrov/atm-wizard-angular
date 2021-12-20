import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from '../../atm.service';
import { ATMOperation } from '../../model/atm-data.model';
import { ActionableStep, SubmissionResult } from '../step.component';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent extends ActionableStep implements OnInit {
  pinNumberFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private atmService: AtmService
  ) {
    super(4);
  }

  ngOnInit() {
    this.pinNumberFormGroup = this.formBuilder.group({
      pinNumber: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });
  }

  isValid(): boolean {
    return this.pinNumberFormGroup.dirty && this.pinNumberFormGroup.valid;
  }

  submit(): SubmissionResult {
    this.atmService.setPinNumber(this.pinNumberFormControl.value);

    if (this.operation === ATMOperation.WITHDRAW) {
      if (this.atmService.isCorrectPIN() && this.atmService.isValidAmount()) {
        // this.atmService.deduceAmount(this.atmService.state.amount);
        return {
          success: true
        };
      } else {
        return {
          success: false,
          errorMessage: 'Not enough money'
        };
      }
    }

    return {
      success: true,
    };
  }

  getTitle(): string {
    return 'PIN';
  }

  get pinNumberFormControl() {
    return this.pinNumberFormGroup.get('pinNumber');
  }

  get form() {
    return this.pinNumberFormGroup;
  }

  get operation(): ATMOperation {
    return this.atmService.currentATMOperation;
  }
}
