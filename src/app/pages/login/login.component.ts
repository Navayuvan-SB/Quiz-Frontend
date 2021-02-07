import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Form field controls
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
    ),
  ]);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Login the user
  loginUser(): void {
    const cred = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };

    // Hit Login API
    this.api.loginUser(cred).subscribe((data) => {
      this.auth.setToken(data['auth-token']);
      this.router.navigate(['home']);
    });
  }

  // Navigate to signup page
  navToSignup() {
    this.router.navigate(['signup']);
  }
}
