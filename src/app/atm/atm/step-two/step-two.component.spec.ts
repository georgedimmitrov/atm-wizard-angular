import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepTwoComponent} from './step-two.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {ATMOperation} from "../../model/atm-data.model";

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StepTwoComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct title', () => {
    expect(component.getTitle()).toEqual('Operation');
  });

  it('should render all available operations', () => {
    const availableOptions = Object.values(ATMOperation);
    const options = debugElement.queryAll(By.css('label'));
    expect(options.length).toEqual(3);

    options.forEach(option => {
      const spanDebugEl = option.query(By.css('span'));
      expect(availableOptions.includes(spanDebugEl.nativeElement.innerText));
    })
  });

  it('should return valid form when option is selected', () => {
    const firstOption = debugElement.query(By.css('input[type="radio"]'));
    firstOption.nativeElement.click();
    expect(component.isValid()).toEqual(true);
  });

  it('should return invalid form when no option is selected', () => {
    expect(component.isValid()).toEqual(false);
  });

  describe('getNormalizedOperationName', () => {
    it('withdraw', () => {
      const normalizedOperationName = component.getNormalizedOperationName(ATMOperation.WITHDRAW);
      expect(normalizedOperationName).toEqual('Withdraw');
    });
    it('check balance', () => {
      const normalizedOperationName = component.getNormalizedOperationName(ATMOperation.CHECK_BALANCE);
      expect(normalizedOperationName).toEqual('Check Balance');
    });
    it('change pin', () => {
      const normalizedOperationName = component.getNormalizedOperationName(ATMOperation.CHANGE_PIN);
      expect(normalizedOperationName).toEqual('Change PIN');
    });
  });
});
