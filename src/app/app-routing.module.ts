import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { SlideListComponent } from './slide-list/slide-list.component';
import { SlideDetailsComponent } from './slide-details/slide-details.component';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { GenerationHistoryListComponent } from './generation-history-list/generation-history-list.component';
import { GenerationHistoryFormComponent } from './generation-history-form/generation-history-form.component';
import { GenerationHistoryDetailsComponent } from './generation-history-details/generation-history-details.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PresentationBriefComponent } from './components/presentation-brief/presentation-brief.component';
import { CreatePresentationComponent } from './pages/create-presentation/create-presentation.component';
import { EditorPresentationComponent } from './pages/editor-presentation/editor-presentation.component';
import { SavedPresentationsComponent } from './pages/saved-presentation/saved-presentation.component';
import { HistoryComponent } from './pages/history/history.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import{AdminDashboardComponent} from  'src/app/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AdminGuard } from './guards/admin.guard';
import { NonAdminGuard } from './guards/non-admin-guard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [NonAdminGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'user', component: BoardUserComponent , canActivate: [AuthGuard]},
  { path: 'mod', component: BoardModeratorComponent , canActivate: [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'templates',component: TemplateListComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'templates/new',component: TemplateFormComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'templates/edit/:id', component: TemplateFormComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'templates/:id', component: TemplateDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'slides', component: SlideListComponent, canActivate: [AuthGuard] },
  { path: 'slides/add', component: SlideFormComponent , canActivate: [AuthGuard]},
  { path: 'slides/edit/:id', component: SlideFormComponent , canActivate: [AuthGuard]},
  { path: 'slides/details/:id', component: SlideDetailsComponent , canActivate: [AuthGuard]},
  { path: 'generation-history', component: GenerationHistoryListComponent , canActivate: [AuthGuard]},
  { path: 'generation-history/add', component: GenerationHistoryFormComponent , canActivate: [AuthGuard]},
  { path: 'generation-history/edit/:id', component: GenerationHistoryFormComponent , canActivate: [AuthGuard]},
  { path: 'generation-history/:id', component: GenerationHistoryDetailsComponent , canActivate: [AuthGuard]},
  { path: 'home11', component: AppComponent , canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard,AdminGuard]},
  { path: 'users/edit/:id', component: UserEditComponent , canActivate: [AuthGuard]},
  { path: 'presentations/newww', component: PresentationBriefComponent , canActivate: [AuthGuard]},
  { path: 'dashboard', component: UserDashboardComponent , canActivate: [AuthGuard]},
  { path: 'create-presentation', component: CreatePresentationComponent , canActivate: [AuthGuard,NonAdminGuard]},
  { path: 'edit-presentation', component: EditorPresentationComponent , canActivate: [AuthGuard]},
  { path: 'saved-presentations', component: SavedPresentationsComponent , canActivate: [AuthGuard]},
  { path: 'history', component: HistoryComponent , canActivate: [AuthGuard, AdminGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard1', component: AdminDashboardComponent, canActivate: [AuthGuard,AdminGuard]},
  { path: 'profile-user', component: ProfileUserComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
