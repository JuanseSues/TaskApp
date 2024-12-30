import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {

  // Define the form group for the login form
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Email field with validation
    password: new FormControl('', [Validators.required]),               // Password field with validation
  })

  constructor(
    private firebaseSvc: FirebaseService, // Inject Firebase service
    private utilsSvc: UtilsService        // Inject utility service
  ) { }

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit() {
  }

  // Method to handle form submission
  submit() {
    if (this.form.valid) { // Check if the form is valid

      this.utilsSvc.presentLoading({ message: 'Authenticating...' }) // Show loading indicator

      this.firebaseSvc.login(this.form.value as User).then(async res => { // Call login method from Firebase service
        console.log(res);

        let user: User = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
        }

        this.utilsSvc.setElementInLocalStorage('user', user); // Store user data in local storage
        this.utilsSvc.routerLink('/tabs/home') // Navigate to the home page

        this.utilsSvc.dismissLoading(); // Dismiss loading indicator

        this.utilsSvc.presentToast({
          message: `Welcome ${user.name}`, // Show welcome toast message
          duration: 2000,
          color: 'success',
          icon: 'person-outline'
        })

        this.form.reset(); // Reset the form

      }, error => {
        this.utilsSvc.dismissLoading(); // Dismiss loading indicator
        this.utilsSvc.presentToast({
          message: error, // Show error toast message
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
      })
    }
  }

}