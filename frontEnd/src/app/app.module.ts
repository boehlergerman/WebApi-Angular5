// since it is a simple program, the decision is made not to use lazy loading and generate individual modules,
// using a single main module for the application.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule, MatDialogModule, MatPaginatorIntl
} from '@angular/material';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Ng2Webstorage } from 'ngx-webstorage'

// Component
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

//Providers
import { AuthGuard } from './common/guards/auth.guard';
import { PublicGuard } from './common/guards/public.guard';
import { AuthenticationService } from './common/services/authentication.service';
import { routes } from './app.routes';

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
    // Core
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    // Material
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    // Custom
    Ng2Webstorage,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    routes
  ],
  providers: [AuthGuard, AuthenticationService, PublicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
