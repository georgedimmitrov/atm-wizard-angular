import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from '../../atm.service';
import { ATMOperation } from '../../model/atm-data.model';
import { ActionableStep, SubmissionResult } from '../step.component';
import { positiveNumberValidator } from '../validators/positive-number-validator';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent extends ActionableStep implements OnInit {
  amountFormGroup: FormGroup;
  readonly operations = ATMOperation;

  constructor(
    private formBuilder: FormBuilder,
    private atmService: AtmService
  ) {
    super(3);
  }

  ngOnInit() {
    this.amountFormGroup = this.formBuilder.group({
      amount: ['', [Validators.required, positiveNumberValidator()]],
      oldPin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      newPin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });
  }

  isValid(): boolean {
    if (this.operation === ATMOperation.WITHDRAW) {
      return this.amountFormControl?.dirty && this.amountFormControl?.valid;
    } else if (this.operation === ATMOperation.CHANGE_PIN) {
      return (
        this.oldPinFormControl.dirty &&
        this.oldPinFormControl.valid &&
        this.newPinFormControl.dirty &&
        this.newPinFormControl.valid
      );
    }
    return true;
  }

  submit(): SubmissionResult {
    if (this.operation === ATMOperation.WITHDRAW) {
      this.atmService.setAmount(this.amountFormControl.value);
      return {
        success: true,
      };
    } else if (this.operation === ATMOperation.CHANGE_PIN) {
      this.atmService.setPinNumber(this.oldPinFormControl.value);
      if (this.atmService.isCorrectPIN()) {
        this.atmService.setNewPin(this.newPinFormControl.value);
        return {
          success: true,
          goToStepIndex: 4,
        };
      } else {
        return {
          success: false,
          errorMessage: 'Invalid PIN',
          goToStepIndex: 4,
        };
      }
    }

    return {
      success: true,
    };
  }

  getTitle(): string {
    if (this.operation === ATMOperation.WITHDRAW) {
      return 'Withdraw';
    } else if (this.operation === ATMOperation.CHANGE_PIN) {
      return 'Change PIN';
    } else {
      return 'Check Balance';
    }
  }

  get amountFormControl() {
    return this.amountFormGroup.get('amount');
  }

  get oldPinFormControl() {
    return this.amountFormGroup.get('oldPin');
  }

  get newPinFormControl() {
    return this.amountFormGroup.get('newPin');
  }

  get form() {
    return this.amountFormGroup;
  }

  get operation(): ATMOperation {
    return this.atmService.currentATMOperation;
  }
}
