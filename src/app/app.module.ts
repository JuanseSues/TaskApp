import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// ------Firebase Configurations------
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent], // Declare the AppComponent
  imports: [
    BrowserModule, // Import BrowserModule for browser-specific services
    IonicModule.forRoot({ mode: 'md' }), // Import IonicModule and set the mode to 'md' (Material Design)
    AppRoutingModule, // Import AppRoutingModule for routing
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize AngularFire with Firebase configuration
    AngularFireAuthModule, // Import AngularFireAuthModule for Firebase authentication
    AngularFirestoreModule // Import AngularFirestoreModule for Firestore database operations
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }], // Provide the IonicRouteStrategy for route reuse
  bootstrap: [AppComponent], // Bootstrap the AppComponent
})
export class AppModule {}