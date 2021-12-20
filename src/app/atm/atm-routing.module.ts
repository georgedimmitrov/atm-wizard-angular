import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AtmComponent} from './atm/atm.component';
import {StepFiveComponent} from './atm/step-five/step-five.component';
import {StepFourComponent} from './atm/step-four/step-four.component';
import {StepOneComponent} from './atm/step-one/step-one.component';
import {StepThreeComponent} from './atm/step-three/step-three.component';
import {StepTwoComponent} from './atm/step-two/step-two.component';

const routes: Routes = [{
  path: '', component: AtmComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtmRoutingModule {
  static components = [
    AtmComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
  ];
}
