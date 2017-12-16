import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';

import { AuthGuard } from './common/guards/auth.guard';
import { routes } from './app.routes';
import { NotFoundComponent } from './common/not-found/not-found.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyA3IpvqipPoQALS-8MoXcCqrIVJlovf2aw',
  authDomain: 'asp-api-62e9f.firebaseapp.com',
  databaseURL: 'https://asp-api-62e9f.firebaseio.com',
  projectId: 'asp-api-62e9f',
  storageBucket: 'asp-api-62e9f.appspot.com',
  messagingSenderId: '72128055785'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
