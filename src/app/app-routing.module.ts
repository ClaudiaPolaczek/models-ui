import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './Profiles/profile/profile.component';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './Basic/login/login.component';
import { AccountComponent } from './Account/account-user/account.component';
import { AdminComponent } from './Admin/admin-users/admin.component';
import { PortfolioComponent } from './Portfolios/portfolio/portfolio.component';
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


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent/*, canActivate: [AuthGuard]*/
  },
  { path: 'profiles', pathMatch: 'full', component: ProfileComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'account/user', pathMatch: 'full', component: AccountComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'portfolios', pathMatch: 'full', component: PortfolioComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'photoshoot', pathMatch: 'full', component: PhotoshootComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: RegisterComponent },
  { path: 'user/model', pathMatch: 'full', component: AccountModelComponent },
  { path: 'user/instagram', pathMatch: 'full', component: AccountInstagramComponent },
  { path: 'user/password', pathMatch: 'full', component: AccountPasswordComponent },
  { path: 'user/settings', pathMatch: 'full', component: AccountSettingsComponent },
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
