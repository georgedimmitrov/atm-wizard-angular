import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepFiveComponent} from './step-five.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AtmService} from "../../atm.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {ATMOperation} from "../../model/atm-data.model";

describe('StepFiveComponent', () => {
  let component: StepFiveComponent;
  let fixture: ComponentFixture<StepFiveComponent>;
  let debugElement: DebugElement;
  let service: AtmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StepFiveComponent],
      providers: [AtmService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFiveComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    service = TestBed.inject(AtmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('should return correct title when', () => {
    it('incorrect PIN', () => {
      expect(component.getTitle()).toEqual('Error 1');
    });
    it('is not a valid amount', () => {
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(false);
      expect(component.getTitle()).toEqual('Error 2');
    });
    it('successfully withdrawn money', () => {
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(true);
      expect(component.getTitle()).toEqual('Result');
    });
  });

  describe('should display correct description when', () => {
    it('incorrect PIN is entered', () => {
      spyOn(service, 'isCorrectPIN').and.returnValue(false);
      fixture.detectChanges();
      expect(getDescriptionTextContent()).toEqual('Wrong PIN');
    });

    it('insufficient amount to withdraw is entered', () => {
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(false);
      fixture.detectChanges();
      expect(getDescriptionTextContent()).toEqual('Not enough money');
    });

    it('PIN is changed successfully', () => {
      service.setOperation(ATMOperation.CHANGE_PIN);
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(true);
      fixture.detectChanges();
      expect(getDescriptionTextContent()).toContain('Successfully changed PIN to:');
    });

    it('Money withdrawal is executed successfully', () => {
      service.setOperation(ATMOperation.WITHDRAW);
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(true);
      const deduceAmountSpy = spyOn(service, 'deduceAmount');
      fixture.detectChanges();
      expect(getDescriptionTextContent()).toContain('Here is your money:');
      expect(deduceAmountSpy).toHaveBeenCalled();
    });

    it('Check Balance is executed successfully', () => {
      service.setOperation(ATMOperation.CHECK_BALANCE);
      spyOn(service, 'isCorrectPIN').and.returnValue(true);
      spyOn(service, 'isValidAmount').and.returnValue(true);
      fixture.detectChanges();
      expect(getDescriptionTextContent()).toContain('Your account balance is:');
    });
  });

  function getDescriptionTextContent(): string {
    const descriptionEl = debugElement.query(By.css('.step-description')).nativeElement;
    return descriptionEl.innerText;
  }

});
