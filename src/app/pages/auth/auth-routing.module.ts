import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

// Define the routes for the AuthPage
const routes: Routes = [
  {
    path: '',            // Default path for the AuthPage
    component: AuthPage  // Component to be rendered for this route
  },
  {
    path: 'sign-up',     // Path for the sign-up page
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule) // Lazy load the SignUpPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Import the RouterModule and configure it with the routes
  exports: [RouterModule],                  // Export the RouterModule so it can be used in other parts of the application
})
export class AuthPageRoutingModule {}