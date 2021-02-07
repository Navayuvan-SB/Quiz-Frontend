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

@Injectable({
  providedIn: 'root',
})
export class CommonGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

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
          if (data['role'] == 'admin' || data['role'] == 'user') {
            resolve(true);
          } else {
            this.router.navigate(['login']);
            reject(false);
          }
        })
        .catch((err) => {
          reject(false);
        });
    });
  }
}
