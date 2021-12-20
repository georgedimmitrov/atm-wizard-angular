import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
  NoPreloading,
} from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/atm' },
  {
    path: 'atm',
    loadChildren: () => import('./atm/atm.module').then((m) => m.AtmModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/atm' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
