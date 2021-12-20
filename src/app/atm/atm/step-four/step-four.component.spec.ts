import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepFourComponent} from './step-four.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {AtmService} from "../../atm.service";
import {ATMOperation} from "../../model/atm-data.model";

describe('StepFourComponent', () => {
  let component: StepFourComponent;
  let fixture: ComponentFixture<StepFourComponent>;
  let debugElement: DebugElement;
  let service: AtmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StepFourComponent],
      providers: [FormBuilder, AtmService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFourComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    service = TestBed.inject(AtmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct title', () => {
    expect(component.getTitle()).toEqual('PIN');
  });


  it('should return valid form when input is filled correctly', () => {
    dispatchInputEvent('.current-pin-input', 1234);

    expect(component.isValid()).toEqual(true);
  });

  it('should return invalid form when input is filled incorrectly', () => {
    dispatchInputEvent('.current-pin-input', 123);
    fixture.detectChanges();

    expect(component.isValid()).toEqual(false);
    const errorEl = debugElement.query(By.css('.error')).nativeElement;
    expect(errorEl).toBeTruthy();
    expect(errorEl.innerText).toContain('Please enter 4 numbers');
  });

  it('should return invalid form when input is empty', () => {
    dispatchInputEvent('.current-pin-input', null);
    fixture.detectChanges();

    expect(component.isValid()).toEqual(false);
    const errorEl = debugElement.query(By.css('.error')).nativeElement;
    expect(errorEl).toBeTruthy();
    expect(errorEl.innerText).toContain('PIN is required');
  });

  describe('submit', () => {
    it('withdraw operation', () => {
      service.setOperation(ATMOperation.WITHDRAW);
      const atmSetPinNumberSpy = spyOn(service, 'setPinNumber');
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(true);
      fixture.detectChanges();
      const mockVal = 123;
      dispatchInputEvent('.current-pin-input', mockVal);
      const submissionResult = component.submit();

      expect(atmSetPinNumberSpy).toHaveBeenCalled();
      expect(atmSetPinNumberSpy).toHaveBeenCalledWith(mockVal);
      expect(submissionResult).toEqual({success: true});
    });

    it('Check Balance operation should call only "setPinNumber"', () => {
      service.setOperation(ATMOperation.CHECK_BALANCE);
      const atmSetPinNumberSpy = spyOn(service, 'setPinNumber');

      fixture.detectChanges();
      const mockVal = 123;
      dispatchInputEvent('.current-pin-input', mockVal);
      const submissionResult = component.submit();

      expect(submissionResult).toEqual({success: true});
      expect(atmSetPinNumberSpy).toHaveBeenCalled();
      expect(atmSetPinNumberSpy).toHaveBeenCalledWith(mockVal);
    });
  });

  function dispatchInputEvent(selector: string, value: number = 123) {
    const inputEl = debugElement.query(By.css(selector)).nativeElement;
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    component.pinNumberFormControl.markAsTouched();
  }
});
