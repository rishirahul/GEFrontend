import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListingsComponent } from './listings/listings.component';
import { FragmentPolyfillModule } from './fragment-polyfill.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingPageComponent,
    ListingsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
