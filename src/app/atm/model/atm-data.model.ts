import { SubmissionResult } from '../atm/step.component';

export interface StepConfiguration {
  index: number;
  component: any;
}

export interface BaseAtmData {
  pin: number;
  amount: number;
}

export interface UserAtmData extends BaseAtmData {
  cardNumber: string;
  operation: ATMOperation;
  submissionResult?: SubmissionResult;
}

export enum ATMOperation {
  WITHDRAW = 'WITHDRAW',
  CHECK_BALANCE = 'CHECK_BALANCE',
  CHANGE_PIN = 'CHANGE_PIN',
}
