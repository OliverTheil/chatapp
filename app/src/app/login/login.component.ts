import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'slacktest';
  reset = false;
  email: string = '';
  password: string = '';
  userName = new UserName();

  constructor(
    public auth: AngularFireAuth,
    public authService: AuthService,
    public router: Router,
    public backend: BackendService
  ) {}
  ngOnInit(): void {}

  signIn() {
    if (this.email.length != 0 && this.password.length != 0) {
      this.authService.SignIn(this.email, this.password);
    } else {
      this.backend.errorMessage('Please enter all your data!');
    }
  }

  loginGuest() {
    // this.auth.signInAnonymously();
    this.authService.SignUpAsGuest(
      'guest' + Math.random().toString().slice(2) + '@account.guest',
      Math.random().toString().slice(2)
    );
  }

  resetPassword() {
    if (this.email.length != 0) {
      this.authService.ForgotPassword(this.email);
    } else {
      this.backend.errorMessage('Please enter your email!');
    }
  }

  routeToChats() {
    this.router.navigate(['/chat/' + this.authService.userData.uid]);
  }

  logout() {
    this.auth.signOut();
  }
}
