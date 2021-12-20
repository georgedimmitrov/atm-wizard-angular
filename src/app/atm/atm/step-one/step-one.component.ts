import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from '../../atm.service';
import { ActionableStep, SubmissionResult } from '../step.component';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent extends ActionableStep implements OnInit {
  cardNumberFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private atmService: AtmService
  ) {
    super(1);
  }

  ngOnInit() {
    this.cardNumberFormGroup = this.formBuilder.group({
      cardNumber: [
        this.atmService.state.cardNumber,
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
    });
  }

  isValid(): boolean {
    return this.cardNumberFormControl.dirty && this.cardNumberFormControl.valid;
  }

  submit(): SubmissionResult {
    this.atmService.setCardNumber(this.cardNumberFormControl.value);
    return {
      success: true,
    };
  }

  getTitle(): string {
    return 'ATM';
  }

  get cardNumberFormControl() {
    return this.cardNumberFormGroup.get('cardNumber');
  }

  get form() {
    return this.cardNumberFormGroup;
  }
}
