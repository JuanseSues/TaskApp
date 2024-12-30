import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPage } from './sign-up.page';

// Define the routes for the SignUpPage
const routes: Routes = [
  {
    path: '',            // Default path for the SignUpPage
    component: SignUpPage // Component to be rendered for this route
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Import the RouterModule and configure it with the routes
  exports: [RouterModule],                  // Export the RouterModule so it can be used in other parts of the application
})
export class SignUpPageRoutingModule {}