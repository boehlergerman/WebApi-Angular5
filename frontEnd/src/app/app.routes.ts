import { PublicGuard } from './common/guards/public.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [PublicGuard] },
    { path: 'login-email', component: EmailComponent, canActivate: [PublicGuard] },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
