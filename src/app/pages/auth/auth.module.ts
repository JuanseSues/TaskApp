import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,             // Provides common directives like ngIf and ngFor
    FormsModule,              // Provides support for template-driven forms
    IonicModule,              // Provides Ionic components and services
    AuthPageRoutingModule,    // Configures routing for the AuthPage
    SharedModule              // Imports shared components, directives, and pipes
  ],
  declarations: [AuthPage]    // Declares the AuthPage component
})
export class AuthPageModule {}