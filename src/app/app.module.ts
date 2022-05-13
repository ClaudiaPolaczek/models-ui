import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BearerAuthInterceptor} from './bearer-auth.interceptor';
import {ProfileComponent} from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PhotoshootComponent } from './photoshoot/photoshoot.component';
import { PrimeNGConfig } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    AccountComponent,
    AdminComponent,
    PortfolioComponent,
    PhotoshootComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF}),
    MenubarModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  providers: [PrimeNGConfig
    //{ provide: HTTP_INTERCEPTORS, useClass: BearerAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
