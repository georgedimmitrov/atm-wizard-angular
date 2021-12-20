import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from '../../atm.service';
import { ATMOperation } from '../../model/atm-data.model';
import { ActionableStep, SubmissionResult } from '../step.component';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent extends ActionableStep implements OnInit {
  atmOperations = Object.values(ATMOperation);
  operationFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private atmService: AtmService
  ) {
    super(2);
  }

  ngOnInit() {
    this.operationFormGroup = this.formBuilder.group({
      option: ['', Validators.required],
    });
  }

  isValid(): boolean {
    return !!this.operationFormControl.value;
  }

  submit(): SubmissionResult {
    this.atmService.setOperation(this.operationFormControl.value);

    if (this.operationFormControl.value === ATMOperation.CHECK_BALANCE) {
      return {
        success: true,
        goToStepIndex: 3,
      };
    }

    return {
      success: true,
    };
  }

  getTitle(): string {
    return 'Operation';
  }

  getNormalizedOperationName(operation: ATMOperation): string {
    if (ATMOperation.WITHDRAW === operation) {
      return 'Withdraw';
    } else if (ATMOperation.CHECK_BALANCE === operation) {
      return 'Check Balance';
    } else {
      return 'Change PIN';
    }
  }

  get operationFormControl() {
    return this.operationFormGroup.get('option');
  }

  get form() {
    return this.operationFormGroup;
  }
}
