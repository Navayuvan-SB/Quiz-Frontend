import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // Form field controls
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  nameFormControl = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {}

  // Create an account for the user
  signUpUser() {
    const cred = {
      email: this.emailFormControl.value,
      name: this.nameFormControl.value,
      password: this.passwordFormControl.value,
    };
  }
}
