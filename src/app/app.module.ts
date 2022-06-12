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
import {FilterService, PrimeNGConfig} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PanelModule} from 'primeng/panel';
import {MessagesModule} from 'primeng/messages';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessageModule} from 'primeng/message';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RouterModule} from '@angular/router';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountPasswordComponent } from './account-password/account-password.component';
import { AccountInstagramComponent } from './account-instagram/account-instagram.component';
import { AccountModelComponent } from './account-model/account-model.component';

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
    AccountSettingsComponent,
    AccountPasswordComponent,
    AccountInstagramComponent,
    AccountModelComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF}),
    MenubarModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    PasswordModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    PanelModule,
    MessagesModule,
    KeyFilterModule,
    MessageModule,
    CommonModule,
    DropdownModule,
    CheckboxModule,
    ConfirmDialogModule
  ],
  providers: [PrimeNGConfig, FilterService
    //{ provide: HTTP_INTERCEPTORS, useClass: BearerAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
