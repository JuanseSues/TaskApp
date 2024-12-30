import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: false,
})
export class CustomInputComponent implements OnInit {

  @Input() control: FormControl; // Input property to bind the form control
  @Input() label: string;        // Input property for the label text
  @Input() icon: string;         // Input property for the icon name
  @Input() type: string;         // Input property for the input type
  @Input() autocomplete: string; // Input property for the autocomplete attribute

  isPassword: boolean;           // Boolean to indicate if the input is a password field
  hide: boolean = true;          // Boolean to control password visibility

  constructor() { }

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true; // Check if the input type is password
  }

  // Method to show or hide the password
  showOrHidePassword() {
    this.hide = !this.hide; // Toggle the hide property

    if (this.hide) {
      this.type = 'password'; // Set the input type to password if hide is true
    } else {
      this.type = 'text'; // Set the input type to text if hide is false
    }
  }

}