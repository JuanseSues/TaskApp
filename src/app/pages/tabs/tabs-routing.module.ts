import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

// Define the routes for the TabsPage
const routes: Routes = [
  {
    path: '', // Default path for the TabsPage
    component: TabsPage,
    children: [
      {
        path: 'home', // Path for the home page
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) // Lazy load the HomePageModule
      },
      {
        path: 'profile', // Path for the profile page
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) // Lazy load the ProfilePageModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Import the RouterModule and configure it with the routes
  exports: [RouterModule],                  // Export the RouterModule so it can be used in other parts of the application
})
export class TabsPageRoutingModule {}
