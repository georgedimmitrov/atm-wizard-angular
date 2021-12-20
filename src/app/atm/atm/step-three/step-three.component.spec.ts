import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepThreeComponent} from './step-three.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ATMOperation} from "../../model/atm-data.model";
import {AtmService} from "../../atm.service";
import {AtmServiceMock} from "../../../mocks/atm.service.mock";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('StepThreeComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;
  let debugElement: DebugElement;
  let service: AtmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StepThreeComponent],
      providers: [
        FormBuilder,
        AtmService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    service = TestBed.inject(AtmService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should return correct title', () => {
    it('withdraw operation', () => {
      service.setOperation(ATMOperation.WITHDRAW);
      expect(component.getTitle()).toEqual('Withdraw');
    });
    it('change pin operation', () => {
      service.setOperation(ATMOperation.CHANGE_PIN);
      expect(component.getTitle()).toEqual('Change PIN');
    });
    it('check balance operation', () => {
      service.setOperation(ATMOperation.CHECK_BALANCE);
      expect(component.getTitle()).toEqual('Check Balance');
    });
  });

  describe('isValid', () => {
    describe('withdraw operation', () => {
      beforeEach(() => {
        service.setOperation(ATMOperation.WITHDRAW);
        fixture.detectChanges();
      });

      it('valid when amount is filled with a number', () => {
        dispatchInputEvent('.amount-input');
        expect(component.isValid()).toEqual(true);
      });

      it('invalid when amount is empty', () => {
        expect(component.isValid()).toEqual(false);
      });
    });

    describe('change pin operation', () => {
      beforeEach(() => {
        service.setOperation(ATMOperation.CHANGE_PIN);
        fixture.detectChanges();
      });

      it('valid when old and new pin are filled with a 4 digit number', () => {
        dispatchInputEvent('.current-pin-input', 1234);
        dispatchInputEvent('.new-pin-input', 4321);

        expect(component.isValid()).toEqual(true);
      });

      it('invalid when amount is empty', () => {
        expect(component.isValid()).toEqual(false);
      });
    });
  });

  describe('submit', () => {
    it('withdraw operation', () => {
      service.setOperation(ATMOperation.WITHDRAW);
      const atmServiceSpy = spyOn(service, 'setAmount');
      fixture.detectChanges();
      const mockVal = 123;

      dispatchInputEvent('.amount-input', mockVal);
      const submissionResult = component.submit();

      expect(atmServiceSpy).toHaveBeenCalled();
      expect(submissionResult).toEqual({success: true});
      expect(atmServiceSpy).toHaveBeenCalledWith(mockVal);
    });

    describe('change pin operation', () => {
      beforeEach(() => {
        service.setOperation(ATMOperation.CHANGE_PIN);
        fixture.detectChanges();
      });

      it('should call "setPinNumber" and "setNewPin" when correct PIN', () => {
        const atmSetPinNumberSpy = spyOn(service, 'setPinNumber');
        const atmSetNewPinNumberSpy = spyOn(service, 'setNewPin');
        spyOn(service, 'isCorrectPIN').and.returnValue(true);

        const currentPinMockValue = 1234;
        const newPinMockValue = 4321;
        dispatchInputEvent('.current-pin-input', currentPinMockValue);
        dispatchInputEvent('.new-pin-input', newPinMockValue);
        const submissionResult = component.submit();

        expect(submissionResult).toEqual({success: true, goToStepIndex: 4});
        expect(atmSetPinNumberSpy).toHaveBeenCalled();
        expect(atmSetPinNumberSpy).toHaveBeenCalledWith(currentPinMockValue);
        expect(atmSetNewPinNumberSpy).toHaveBeenCalled();
        expect(atmSetNewPinNumberSpy).toHaveBeenCalledWith(newPinMockValue);
      });

      it('should call only "setPinNumber" when incorrect PIN', () => {
        const atmSetPinNumberSpy = spyOn(service, 'setPinNumber');
        const atmSetNewPinNumberSpy = spyOn(service, 'setNewPin');

        const currentPinMockValue = 1111;
        const newPinMockValue = 4321;
        dispatchInputEvent('.current-pin-input', currentPinMockValue);
        dispatchInputEvent('.new-pin-input', newPinMockValue);
        const submissionResult = component.submit();
        expect(submissionResult).toEqual({success: false, errorMessage: 'Invalid PIN', goToStepIndex: 4});
        expect(atmSetPinNumberSpy).toHaveBeenCalled();
        expect(atmSetPinNumberSpy).toHaveBeenCalledWith(currentPinMockValue);
        expect(atmSetNewPinNumberSpy).not.toHaveBeenCalled();
      });
    });
  });

  function dispatchInputEvent(selector: string, value: number = 123) {
    const inputEl = debugElement.query(By.css(selector)).nativeElement;
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
  }
});
