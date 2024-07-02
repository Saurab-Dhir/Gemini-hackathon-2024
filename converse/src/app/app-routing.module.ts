import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversePageComponent } from './converse-page/converse-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'converse', component: ConversePageComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
