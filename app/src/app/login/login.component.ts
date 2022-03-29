import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
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

  constructor(public auth: AngularFireAuth, public authService: AuthService) { }
  ngOnInit(): void { }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginEmail() {

    this.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  loginGuest() {
    this.auth.signInAnonymously();
  }

  createAccount() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password);
  }

  logout() {
    this.auth.signOut();
  }
}
