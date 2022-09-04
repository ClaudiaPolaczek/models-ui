import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './Basic/login/login.component';
import { AccountComponent } from './Account/account-user/account.component';
import { AdminComponent } from './Admin/admin-users/admin.component';
import { PhotoshootComponent } from './Profiles/photoshoot/photoshoot.component';
import { AppComponent } from './app.component';
import {RegisterComponent} from './Basic/register/register.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AccountModelComponent} from './Account/account-model/account-model.component';
import {AccountInstagramComponent} from './Account/account-instagram/account-instagram.component';
import {AccountPasswordComponent} from './Account/account-password/account-password.component';
import {AccountSettingsComponent} from './Account/account-settings/account-settings.component';
import {AdminCommentsComponent} from './Admin/admin-comments/admin-comments.component';
import {InvitationsComponent} from './Account/invitations/invitations.component';
import {CalendarComponent} from './Account/calendar/calendar.component';
import {NotificationsComponent} from './Account/notifications/notifications.component';
import {NewPortfolioComponent} from './Account/portfolio-new/new-portfolio.component';
import {AccountPortfoliosComponent} from './Account/account-portfolios/account-portfolios.component';
import {PortfolioEditComponent} from './Account/portfolio-edit/portfolio-edit.component';
import {ModelProfileComponent} from './Profiles/model-profile/model-profile.component';
import {ModelProfilesComponent} from './Profiles/model-profiles/model-profiles.component';
import {PhotographerProfilesComponent} from './Profiles/photographer-profiles/photographer-profiles.component';
import {PhotoshootInvitationComponent} from './Profiles/photoshoot-invitation/photoshoot-invitation.component';
import {PortfolioListComponent} from './Portfolios/portfolio-list/portfolio-list.component';
import {PortfolioImagesComponent} from './Portfolios/portfolio-images/portfolio-images.component';
import {RegulationsComponent} from './Basic/regulations/regulations.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent/*, canActivate: [AuthGuard]*/
  },
  { path: 'account/user', pathMatch: 'full', component: AccountComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'portfolios', pathMatch: 'full', component: PortfolioListComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'portfolios/:id', pathMatch: 'full', component: PortfolioImagesComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'photoshoot', pathMatch: 'full', component: PhotoshootComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'photoshoot/:id', pathMatch: 'full', component: PhotoshootInvitationComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: RegisterComponent },
  { path: 'regulations', pathMatch: 'full', component: RegulationsComponent },
  { path: 'user/model', pathMatch: 'full', component: AccountModelComponent },
  { path: 'user/instagram', pathMatch: 'full', component: AccountInstagramComponent },
  { path: 'user/password', pathMatch: 'full', component: AccountPasswordComponent },
  { path: 'user/settings', pathMatch: 'full', component: AccountSettingsComponent },
  { path: 'user/new/portfolio', pathMatch: 'full', component: NewPortfolioComponent },
  { path: 'user/portfolio', pathMatch: 'full', component: AccountPortfoliosComponent },
  { path: 'edit/portfolio/:id', component: PortfolioEditComponent },
  { path: 'models', pathMatch: 'full', component: ModelProfilesComponent },
  { path: 'models/:id', component: ModelProfileComponent },
  { path: 'photographers', pathMatch: 'full', component: PhotographerProfilesComponent },
  { path: 'photographers/:id', component: PhotographerProfilesComponent },
  { path: 'admin/comments', pathMatch: 'full', component: AdminCommentsComponent },
  { path: 'admin/users', pathMatch: 'full', component: AdminComponent },
  { path: 'plan', pathMatch: 'full', component: CalendarComponent },
  { path: 'invitations', pathMatch: 'full', component: InvitationsComponent },
  { path: 'notifications', pathMatch: 'full', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
