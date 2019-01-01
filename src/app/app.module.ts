import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListingsComponent } from './listings/listings.component';
import { FragmentPolyfillModule } from './fragment-polyfill.module';
import { AppErrorHandler } from './common/app-error-handler';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './services/data.service';
import { ListingService } from './services/listing.service';

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
    HttpClientModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    })
  ],
  providers: [DataService,
    ListingService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
