import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'slacktest';

  email: string = '';
  password: string = '';
  userName = new UserName();

  constructor(
    public auth: AngularFireAuth,
    public authService: AuthService,
    public router: Router
  ) {}
  ngOnInit(): void {}

  loginGuest() {
    // this.auth.signInAnonymously();
    this.authService.SignUpAsGuest(
      'guest' + Math.random().toString().slice(2) + '@account.guest',
      Math.random().toString().slice(2)
    );
  }

  routeToChats() {
    this.router.navigate(['/main/' + this.authService.userData.uid]);
  }

  logout() {
    this.auth.signOut();
  }
}
