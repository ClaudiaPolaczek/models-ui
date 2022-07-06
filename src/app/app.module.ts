import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BearerAuthInterceptor} from './bearer-auth.interceptor';
import {ProfileComponent} from './Profiles/profile/profile.component';
import { LoginComponent } from './Basic/login/login.component';
import { AccountComponent } from './Account/account-user/account.component';
import { AdminComponent } from './Admin/admin-users/admin.component';
import { PortfolioComponent } from './Portfolios/portfolio/portfolio.component';
import { PhotoshootComponent } from './Profiles/photoshoot/photoshoot.component';
import {FilterService, PrimeNGConfig} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { RegisterComponent } from './Basic/register/register.component';
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
import { AccountSettingsComponent } from './Account/account-settings/account-settings.component';
import { AccountPasswordComponent } from './Account/account-password/account-password.component';
import { AccountInstagramComponent } from './Account/account-instagram/account-instagram.component';
import { AccountModelComponent } from './Account/account-model/account-model.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegulationsComponent } from './Basic/regulations/regulations.component';
import { AdminCommentsComponent } from './Admin/admin-comments/admin-comments.component';
import { ModelProfileComponent } from './Profiles/model-profile/model-profile.component';
import { ModelProfilesComponent } from './Profiles/model-profiles/model-profiles.component';
import { PhotographerProfilesComponent } from './Profiles/photographer-profiles/photographer-profiles.component';
import { PhotographerProfileComponent } from './Profiles/photographer-profile/photographer-profile.component';
import { PhotoshootInvitationComponent } from './Profiles/photoshoot-invitation/photoshoot-invitation.component';
import { PortfolioImagesComponent } from './Portfolios/portfolio-images/portfolio-images.component';
import { PortfolioListComponent } from './Portfolios/portfolio-list/portfolio-list.component';
import { NotificationsComponent } from './Account/notifications/notifications.component';
import { InvitationsComponent } from './Account/invitations/invitations.component';
import { CalendarComponent } from './Account/calendar/calendar.component';
import {ErrorInterceptor} from './error.interceptor';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TableModule} from 'primeng/table';
import { NewPortfolioComponent } from './Account/portfolio-new/new-portfolio.component';
import { PortfolioEditComponent } from './Account/portfolio-edit/portfolio-edit.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { AccountPortfoliosComponent } from './Account/account-portfolios/account-portfolios.component';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {CarouselModule} from 'primeng/carousel';
//import {RatingModule} from 'primeng/rating';
import {RatingModule} from 'ng-starrating';

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
    WelcomeComponent,
    RegulationsComponent,
    AdminCommentsComponent,
    ModelProfileComponent,
    ModelProfilesComponent,
    PhotographerProfilesComponent,
    PhotographerProfileComponent,
    PhotoshootInvitationComponent,
    PortfolioImagesComponent,
    PortfolioListComponent,
    NotificationsComponent,
    InvitationsComponent,
    CalendarComponent,
    NewPortfolioComponent,
    PortfolioEditComponent,
    PortfoliosComponent,
    AccountPortfoliosComponent,
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
        ConfirmDialogModule,
        ConfirmPopupModule,
        TableModule,
        DialogModule,
        FileUploadModule,
        CarouselModule,
        RatingModule,
        RatingModule
    ],
  providers: [PrimeNGConfig, FilterService,
    { provide: HTTP_INTERCEPTORS, useClass: BearerAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
