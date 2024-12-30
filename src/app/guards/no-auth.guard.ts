import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
  ) {}

  /**
   * Determines if a route can be activated.
   * @param route The activated route snapshot.
   * @param state The router state snapshot.
   * @returns An observable, promise, or boolean indicating if the route can be activated.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Get the authentication state from the Firebase service
    return this.firebaseSvc.getAuthState().pipe(
      map(auth => {
        // If the user is not authenticated, allow activation of the route
        if (!auth) {
          return true;
        } else {
          // If the user is authenticated, redirect to the home page
          this.utilsSvc.routerLink('/tabs/home');
          return false;
        }
      })
    );
  }
}