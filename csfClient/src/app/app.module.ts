import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { TriviaResultComponent } from './components/trivia/trivia-result.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { LoginComponent } from './components/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/register.component';
import { ArcadeHomeComponent } from './components/arcade/arcade-home.component';
import { TriviaHomeComponent } from './components/trivia/trivia-home.component';
import { TriviaCustomComponent } from './components/trivia/trivia-custom.component';
import { TriviaCreateComponent } from './components/trivia/trivia-create.component';
import { AuthGuard } from './shared/auth.guard';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeleteUserComponent } from './components/settings/delete-user.component';
import { StarfallComponent } from './components/arcade/starfall/starfall.component';

const appRoutes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'trivia', component: TriviaHomeComponent, canActivate:[AuthGuard]},
  {path: 'trivia/classic', component: TriviaComponent, canActivate:[AuthGuard]},
  {path: 'trivia/custom', component: TriviaCustomComponent, canActivate:[AuthGuard]},
  {path: 'trivia/create', component:TriviaCreateComponent, canActivate:[AuthGuard]},
  {path: 'trivia/results/:score', component: TriviaResultComponent, canActivate:[AuthGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  {path: 'leaderboard', component: LeaderboardComponent, canActivate:[AuthGuard]},
  {path: 'arcade', component: ArcadeHomeComponent, canActivate:[AuthGuard]},
  {path: 'starfall', component: StarfallComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    TriviaComponent,
    HomeComponent,
    TriviaResultComponent,
    LoginComponent,
    RegisterComponent,
    ArcadeHomeComponent,
    TriviaHomeComponent,
    TriviaCustomComponent,
    TriviaCreateComponent,
    LeaderboardComponent,
    SettingsComponent,
    DeleteUserComponent,
    StarfallComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
    
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
