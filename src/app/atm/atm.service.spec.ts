import {TestBed} from '@angular/core/testing';

import {AtmService} from './atm.service';
import {ATMOperation} from "./model/atm-data.model";

describe('AtmService', () => {
  let service: AtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setCardNumber', () => {
    const mockCardNumber = '1234123412341234';

    expect(service.state.cardNumber).toBeFalsy();

    service.setCardNumber(mockCardNumber);
    expect(service.state.cardNumber).toEqual(mockCardNumber);
  });

  it('setOperation', () => {
    const mockOperation = ATMOperation.CHANGE_PIN;

    expect(service.state.operation).toBeNull();

    service.setOperation(mockOperation);
    expect(service.state.operation).toEqual(mockOperation);
  });

  it('setAmount', () => {
    const mockAmount = 123;

    expect(service.state.amount).toEqual(0);

    service.setAmount(mockAmount);
    expect(service.state.amount).toEqual(mockAmount);
  });

  it('setPinNumber', () => {
    const mockPin = 4321;

    expect(service.state.pin).toEqual(0);

    service.setPinNumber(mockPin);
    expect(service.state.pin).toEqual(mockPin);
  });

  it('resetState', () => {
    service.state = {
      cardNumber: '1234123412341234',
      pin: 1234,
      amount: 3000,
      operation: ATMOperation.WITHDRAW
    };

    service.resetState();

    expect(service.state.cardNumber).toBeFalsy();
    expect(service.state.pin).toEqual(0);
    expect(service.state.amount).toEqual(0);
    expect(service.state.operation).toBeNull();
  });

  it('isCorrectPIN truthy when correct', () => {
    service.setPinNumber(1234);

    expect(service.isCorrectPIN()).toEqual(true);
  });

  it('isCorrectPIN falsy when inccorrect', () => {
    service.setPinNumber(4231);

    expect(service.isCorrectPIN()).toEqual(false);
  });

  it('deduceAmount', () => {
    const mockAmount = 100;

    expect(service.initialState.amount).toEqual(2000);

    service.deduceAmount(mockAmount);

    expect(service.initialState.amount).toEqual(2000 - mockAmount);
  });

  it('isValidAmount is truthy when enough liquidity in account', () => {
    service.setAmount(200);

    expect(service.isValidAmount()).toEqual(true);
  });

  it('isValidAmount is falsy when NOT enough liquidity in account', () => {
    service.setAmount(20000);

    expect(service.isValidAmount()).toEqual(false);
  });

  it('setNewPin should update both initialState and state', () => {
    const mockPin = 2345;

    service.setNewPin(mockPin);

    expect(service.state.pin).toEqual(mockPin);
    expect(service.initialState.pin).toEqual(mockPin);
  });
});
