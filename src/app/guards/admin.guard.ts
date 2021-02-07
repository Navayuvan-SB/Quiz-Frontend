import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean>((resolve, reject) => {
      this.auth
        .getTokendata()
        .then((data) => {
          if (data['role'] == 'admin') {
            resolve(true);
          } else {
            this.router.navigate(['login']);
            this._snackBar.open('Un Authorized', '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            reject(false);
          }
        })
        .catch((err) => {
          this.router.navigate(['login']);
          this._snackBar.open('Un Authorized', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          reject(false);
        });
    });
  }
}
