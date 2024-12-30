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

  user = {} as User;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser();
  }


  getUser() {
    return this.user = this.utilSvc.getElementFromLocalStorage('user');
  }

  signOut() {
    this.utilSvc.presentAlert({
      header: 'Close session',
      message: 'Do you want to close the session?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          
        }, {
          text: 'Yes',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    })
  }

}
