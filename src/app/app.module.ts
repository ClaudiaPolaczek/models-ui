import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BearerAuthInterceptor} from './bearer-auth.interceptor';
import {ProfileComponent} from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PhotoshootComponent } from './photoshoot/photoshoot.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    AccountComponent,
    AdminComponent,
    PortfolioComponent,
    PhotoshootComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BearerAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
