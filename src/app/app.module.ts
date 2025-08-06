import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/http.interceptor';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { SlideDetailsComponent } from './slide-details/slide-details.component';
import { CommonModule } from '@angular/common';
import { SlideListComponent } from './slide-list/slide-list.component';
import { GenerationHistoryDetailsComponent } from './generation-history-details/generation-history-details.component';
import { GenerationHistoryFormComponent } from './generation-history-form/generation-history-form.component';
import { GenerationHistoryListComponent } from './generation-history-list/generation-history-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PresentationBriefComponent } from './components/presentation-brief/presentation-brief.component';
import { CreatePresentationComponent } from './pages/create-presentation/create-presentation.component';
import { EditorPresentationComponent } from './pages/editor-presentation/editor-presentation.component';
import { SavedPresentationsComponent } from './pages/saved-presentation/saved-presentation.component';
import { HistoryComponent } from './pages/history/history.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfileUserComponent } from './profile-user/profile-user.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    TemplateListComponent,
    TemplateFormComponent,
    TemplateDetailsComponent,
    SlideFormComponent,
    SlideDetailsComponent,
    SlideListComponent,
    GenerationHistoryDetailsComponent,
    GenerationHistoryFormComponent,
    GenerationHistoryListComponent,
    NavbarComponent,
    UsersComponent,
    UserEditComponent,
    UserDashboardComponent,
    PresentationBriefComponent,
    CreatePresentationComponent,
    EditorPresentationComponent,
    SavedPresentationsComponent,
    HistoryComponent,
    AdminDashboardComponent,
    SideBarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileUserComponent,
    
   

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
    
  ],
  providers: [authInterceptorProviders], 
  bootstrap: [AppComponent]
})
export class AppModule { }
