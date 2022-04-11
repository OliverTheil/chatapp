import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private backend: BackendService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const user = await JSON.parse(localStorage.getItem('user')!);
    const isAuthenticated = user ? true : false;
    if (!isAuthenticated) {
      this.backend.errorMessage(
        'You must be authenticated in order to access this page!'
      );
      this.router.navigate(['']);
    }
    return isAuthenticated;
  }
}
