import {BaseAtmData, UserAtmData} from "../atm/model/atm-data.model";

export class AtmServiceMock {
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

  setCardNumber(): void {}
  setOperation(): void {}
  setAmount(): void {}
  setPinNumber(): void {}
  resetState(): void {}
  isCorrectPIN(): boolean {
    return true;
  }
  deduceAmount(): void {}
  isValidAmount(): boolean {
    return true;
  }
  setNewPin(): void {}
}
