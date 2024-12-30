import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';

@NgModule({
  declarations: [
    HeaderComponent,          // Declare the HeaderComponent
    CustomInputComponent,     // Declare the CustomInputComponent
    LogoComponent,            // Declare the LogoComponent
    AddUpdateTaskComponent    // Declare the AddUpdateTaskComponent
  ],
  exports: [
    HeaderComponent,          // Export the HeaderComponent
    CustomInputComponent,     // Export the CustomInputComponent
    LogoComponent,            // Export the LogoComponent
    NgCircleProgressModule,   // Export the NgCircleProgressModule
    AddUpdateTaskComponent    // Export the AddUpdateTaskComponent
  ],
  imports: [
    CommonModule,             // Import CommonModule for common directives
    IonicModule,              // Import IonicModule for Ionic components
    FormsModule,              // Import FormsModule for template-driven forms
    ReactiveFormsModule,      // Import ReactiveFormsModule for reactive forms
    RouterModule,             // Import RouterModule for routing
    NgCircleProgressModule.forRoot({
      radius: 100,            // Set the radius for the circle progress
      outerStrokeWidth: 16,   // Set the outer stroke width
      innerStrokeWidth: 8,    // Set the inner stroke width
      outerStrokeColor: "#78C000", // Set the outer stroke color
      innerStrokeColor: "#C7E596", // Set the inner stroke color
      animationDuration: 300, // Set the animation duration
    })
  ]
})
export class SharedModule { }