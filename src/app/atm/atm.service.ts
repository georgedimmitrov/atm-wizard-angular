import { Injectable } from '@angular/core';
import { SubmissionResult } from './atm/step.component';
import {ATMOperation, BaseAtmData, StepConfiguration, UserAtmData} from './model/atm-data.model';
import {StepOneComponent} from "./atm/step-one/step-one.component";

@Injectable({ providedIn: 'root' })
export class AtmService {
  // DEFAULT VALUES for testing purposes
  initialState: BaseAtmData = {
    pin: 1234,
    amount: 2000,
  };

  state: UserAtmData = {
    cardNumber: '',
    pin: 0,
    amount: 0,
    operation: null,
    submissionResult: null,
  };

  setCardNumber(cardNumber: string): void {
    this.state = { ...this.state, cardNumber };
  }

  setOperation(operation: ATMOperation): void {
    this.state = { ...this.state, operation };
  }

  setAmount(amount: number): void {
    this.state = { ...this.state, amount };
  }

  setPinNumber(pin: number): void {
    this.state = { ...this.state, pin };
  }

  resetState(): void {
    this.state = {
      cardNumber: '',
      pin: 0,
      amount: 0,
      operation: null,
    };
  }

  isCorrectPIN(): boolean {
    return this.state.pin === this.initialState.pin;
  }

  deduceAmount(amount: number): void {
    this.initialState = {
      ...this.initialState,
      amount: this.initialState.amount - amount,
    };
  }

  isValidAmount(): boolean {
    return this.state.amount <= this.initialState.amount;
  }

  setNewPin(pin: number): void {
    this.initialState = { ...this.initialState, pin };
    this.setPinNumber(pin);
  }

  get currentATMOperation(): ATMOperation {
    return this.state.operation;
  }

  get currentAmount(): number {
    return this.initialState.amount;
  }

  get currentPin(): number {
    return this.initialState.pin;
  }
}
