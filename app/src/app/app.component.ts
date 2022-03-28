import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slacktest';
  email: string;
  password: string;

  constructor(public auth: AngularFireAuth) {}

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then;
  }

  loginEmail() {
    this.auth.signInWithEmailAndPassword(this.email, this.password).then();
  }

  loginGuest() {
    this.auth.signInAnonymously;
  }

  createAccount() {}

  logout() {
    this.auth.signOut();
  }
}
