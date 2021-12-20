import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AtmComponent } from './atm.component';
import {StepOneComponent} from "./step-one/step-one.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {StepTwoComponent} from "./step-two/step-two.component";
import {StepThreeComponent} from "./step-three/step-three.component";
import {StepFourComponent} from "./step-four/step-four.component";
import {StepFiveComponent} from "./step-five/step-five.component";
import {By} from "@angular/platform-browser";
import {AtmService} from "../atm.service";

describe('AtmComponent', () => {
  let component: AtmComponent;
  let fixture: ComponentFixture<AtmComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        AtmComponent,
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        StepFourComponent,
        StepFiveComponent
      ],
      providers: [FormBuilder, AtmService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('steps and currentStep are initialized correctly', () => {
    expect(component.steps.length).toEqual(5);
    expect(component.currentStep.index).toEqual(1);
  });

  describe('clicking "next" button with',  () => {
    it(' valid step and successful result without specific index goes to next step', fakeAsync(() => {
      spyOn(component.currentStep, 'isValid').and.returnValue(true);
      spyOn(component.currentStep, 'submit').and.returnValue({success: true});

      let spyNextMethod = spyOn(component, 'next');
      const nextBtnEl = debugElement.query(By.css('.next-btn'));
      nextBtnEl.triggerEventHandler('click', null);
      tick();
      expect(spyNextMethod).toHaveBeenCalled();
    }));

    it(' valid step and unsuccessful result goes to the final step', fakeAsync(() => {
      spyOn(component.currentStep, 'isValid').and.returnValue(true);
      spyOn(component.currentStep, 'submit').and.returnValue({success: false});

      let spyNextMethod = spyOn(component, 'next');
      const nextBtnEl = debugElement.query(By.css('.next-btn'));
      nextBtnEl.triggerEventHandler('click', null);
      tick();
      expect(spyNextMethod).toHaveBeenCalled();
    }));
  });

  it('clicking "startOver" button', fakeAsync(() => {
    const startOverSpy = spyOn(component, 'startOver');
    component.currentStep.index = 5;
    tick();
    fixture.detectChanges();

    const startOverBtn = debugElement.query(By.css('.start-over-btn'));
    startOverBtn.triggerEventHandler('click', null);
    tick();

    expect(startOverSpy).toHaveBeenCalled();
  }));

  it('clicking "cancel" button', fakeAsync(() => {
    component.currentStep = component.steps[1];
    fixture.detectChanges();
    const cancelSpy = spyOn(component, 'cancel');

    const cancelBtn = debugElement.query(By.css('.cancel-btn'));
    cancelBtn.triggerEventHandler('click', null);
    tick();

    expect(cancelSpy).toHaveBeenCalled();
  }));

});
