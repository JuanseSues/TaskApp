import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {

  // Define the form group for the sign-up form
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]), // Name field with validation
    email: new FormControl('', [Validators.required, Validators.email]),       // Email field with validation
    password: new FormControl('', [Validators.required]),                      // Password field with validation
    confirmPassword: new FormControl(''),                                      // Confirm password field
  })

  constructor(
    private firebaseSvc: FirebaseService, // Inject Firebase service
    private utilsSvc: UtilsService        // Inject utility service
  ) { }

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit() {
    this.confirmPasswordValidator(); // Initialize the confirm password validator
  }

  // Method to set the confirm password validator
  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password) // Custom validator to match password
    ])

    this.form.controls.confirmPassword.updateValueAndValidity(); // Update the validity of the confirm password field
  }

  // Method to handle form submission
  submit() {
    if (this.form.valid) { // Check if the form is valid

      this.utilsSvc.presentLoading({ message: 'Registrando...' }) // Show loading indicator

      this.firebaseSvc.signUp(this.form.value as User).then(async res => { // Call sign-up method from Firebase service
        console.log(res);

        await this.firebaseSvc.updateUser({ displayName: this.form.value.name }) // Update user profile with display name

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