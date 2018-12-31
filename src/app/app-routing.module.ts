import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListingsComponent } from './listings/listings.component';


const routes: Routes = [
  { path: 'main', component: LandingPageComponent},
  { path: 'products', component: ListingsComponent},
  { path: '**', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
