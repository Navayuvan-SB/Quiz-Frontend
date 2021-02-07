import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

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
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
    ),
  ]);

  nameFormControl = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // Create an account for the user
  signUpUser() {
    const cred = {
      email: this.emailFormControl.value,
      name: this.nameFormControl.value,
      password: this.passwordFormControl.value,
    };

    this.api.createUser(cred).subscribe((resp) => {
      this.snackBar.open('User account created, please login to continue', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.router.navigate(['login']);
    });
  }

  // Navigate to Login
  navToLogin() {
    this.router.navigate(['login']);
  }
}
