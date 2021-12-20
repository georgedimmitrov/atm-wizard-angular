import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmRoutingModule } from './atm-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StepOneComponent } from './atm/step-one/step-one.component';
import { StepTwoComponent } from './atm/step-two/step-two.component';
import { StepThreeComponent } from './atm/step-three/step-three.component';
import { StepFourComponent } from './atm/step-four/step-four.component';
import { StepFiveComponent } from './atm/step-five/step-five.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AtmRoutingModule],
  declarations: [AtmRoutingModule.components, StepOneComponent, StepTwoComponent, StepThreeComponent, StepFourComponent, StepFiveComponent],
})
export class AtmModule {}
