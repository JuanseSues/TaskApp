import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,             // Provides common directives like ngIf and ngFor
    FormsModule,              // Provides support for template-driven forms
    IonicModule,              // Provides Ionic components and services
    SignUpPageRoutingModule,  // Configures routing for the SignUpPage
    SharedModule              // Imports shared components, directives, and pipes
  ],
  declarations: [SignUpPage]  // Declares the SignUpPage component
})
export class SignUpPageModule {}