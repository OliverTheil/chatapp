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

  constructor(public auth: AngularFireAuth, public authService: AuthService) { }
  ngOnInit(): void { }


  loginGuest() {
    this.auth.signInAnonymously();
  }

  logout() {
    this.auth.signOut();
  }
}
