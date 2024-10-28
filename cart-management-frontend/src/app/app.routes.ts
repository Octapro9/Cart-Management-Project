// import { Routes } from '@angular/router';

// export const routes: Routes = [];


import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component'; // 
import { RegisterComponent } from './register/register.component'; // 
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },      // Home page
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'register', component: RegisterComponent }, // Registration page
  { path: 'account', component: AccountComponent },
  { path: 'admin', component: AdminComponent},
  // { path: }
];
