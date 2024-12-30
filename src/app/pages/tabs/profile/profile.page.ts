import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  // Object to hold user information
  user = {} as User;

  constructor(
    private firebaseSvc: FirebaseService, // Inject Firebase service
    private utilSvc: UtilsService         // Inject utility service
  ) { }

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit() {
  }

  // Lifecycle hook that is called when the view is about to enter and become the active view
  ionViewWillEnter() {
    this.getUser(); // Fetch user information
  }

  // Method to get user information from local storage
  getUser() {
    return this.user = this.utilSvc.getElementFromLocalStorage('user');
  }

  // Method to sign out the user
  signOut() {
    this.utilSvc.presentAlert({
      header: 'Close session', // Alert header
      message: 'Do you want to close the session?', // Alert message
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.firebaseSvc.signOut(); // Call signOut method from Firebase service
          }
        }
      ]
    })
  }

}
