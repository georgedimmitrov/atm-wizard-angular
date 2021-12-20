import { Component, OnInit } from '@angular/core';
import { AtmService } from '../../atm.service';
import { ATMOperation } from '../../model/atm-data.model';
import { ActionableStep, SubmissionResult } from '../step.component';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss'],
})
export class StepFiveComponent extends ActionableStep {
  constructor(private atmService: AtmService) {
    super(5);
  }

  isValid(): boolean {
    return true;
  }

  submit(): SubmissionResult {
    this.atmService.resetState();
    return {
      success: true,
    };
  }

  getTitle(): string {
    if (!this.atmService.isCorrectPIN()) {
      return 'Error 1';
    } else if (!this.atmService.isValidAmount()) {
      return 'Error 2';
    }
    return 'Result';
  }

  get description(): string {
    if (!this.atmService.isCorrectPIN()) {
      return 'Wrong PIN';
    } else if (!this.atmService.isValidAmount()) {
      return 'Not enough money';
    }
    if (this.operation === ATMOperation.CHANGE_PIN) {
      return `Successfully changed PIN to: ${this.atmService.state.pin}`;
    } else if (this.operation === ATMOperation.WITHDRAW) {
      this.atmService.deduceAmount(this.atmService.state.amount);
      return `Here is your money: ${this.atmService.state.amount}`;
    } else {
      return `Your account balance is: ${this.atmService.initialState.amount}`;
    }
  }

  get operation(): ATMOperation {
    return this.atmService.currentATMOperation;
  }
}
