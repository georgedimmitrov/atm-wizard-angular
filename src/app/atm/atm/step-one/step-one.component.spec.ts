import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepOneComponent} from './step-one.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AtmService} from "../../atm.service";
import {AtmServiceMock} from "../../../mocks/atm.service.mock";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;
  let debugElement: DebugElement;
  let atmService: AtmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StepOneComponent],
      providers: [
        FormBuilder,
        {provide: AtmService, useClass: AtmServiceMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    atmService = TestBed.inject(AtmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct title', () => {
    expect(component.getTitle()).toEqual('ATM');
  });

  it('should return valid form when input is filled correctly', () => {
    dispatchInputEvent(1234123412341234);

    expect(component.isValid()).toEqual(true);
  });

  it('should return invalid form when input is filled incorrectly', () => {
    dispatchInputEvent(1234);

    fixture.detectChanges();

    expect(component.isValid()).toEqual(false);

    const errorEl = debugElement.query(By.css('.error')).nativeElement;

    expect(errorEl).toBeTruthy();
    expect(errorEl.innerText).toContain('Please enter 12 numbers');
  });

  it('should be able to submit form', () => {
    const mockValue = 1234;
    dispatchInputEvent(mockValue);
    const atmServiceSpy = spyOn(atmService, 'setCardNumber');
    const submissionResult = component.submit();

    expect(atmServiceSpy).toHaveBeenCalled();
    expect(submissionResult).toEqual({success: true});
    expect(atmServiceSpy).toHaveBeenCalledWith((mockValue as any));
  });

  function dispatchInputEvent(value: number): void {
    const inputEl = debugElement.query(By.css('input')).nativeElement;
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    component.cardNumberFormControl.markAsTouched();
  }
});


