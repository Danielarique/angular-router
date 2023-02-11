import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
 /*    const token = this.tokenService.getToken();
    if(!token){
      this.router.navigate(['/home']);

      return false;
    }
    return
    return token ? true : false; */
    return this.authService.user$
    .pipe(
      map(user=>{
        if(!user){
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )
  }
}
