import { Injectable, NgZone } from '@angular/core';
import { User } from '../app/shared/services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserName } from 'src/models/username.class';
import * as firebase from 'firebase/compat';
import { resourceLimits } from 'worker_threads';
import { BackendService } from './backend.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  userName = new UserName();
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public backend: BackendService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.setUserNameFromFirebase();
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {});
        this.SetUserData(result.user);
      })
      .catch((error) => {
        if (error.message.includes('wrong')) {
          this.backend.errorMessage('Wrong Email or Password!');
        }
        if (error.message.includes('user')) {
          this.backend.errorMessage('Wrong Email or Password!');
        }
        if (error.message.includes('invalid')) {
          this.backend.errorMessage('Invalid Email!');
        }
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SignUpUserData(result.user);
      })
      .catch((error) => {
        if (error.message.includes('already')) {
          this.backend.errorMessage('The email already exists!');
        }
        if (error.message.includes('invalid')) {
          this.backend.errorMessage('Invalid Email!');
        }
      });
  }

  SignUpAsGuest(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetGuestData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        Swal.fire({
          title: 'Check your emails!',
          position: 'center',
          heightAuto: false,
          background: 'rgb(39, 39, 39)',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        if (error.message.includes('invalid')) {
          this.backend.errorMessage('Invalid Email!');
        }
        if (error.message.includes('wrong')) {
          this.backend.errorMessage('The email does not exist!');
        }
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     if (res) {
  //       this.SetUserData(res.user);
  //       this.router.navigate(['/chat/' + res.user.uid]);
  //     }
  //   });
  // }
  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['/chat/' + result.user.uid]);
  //       });
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  SetUserData(user: any) {
    console.log(user);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
  }

  SignUpUserData(user: any) {
    console.log('SignUpUserData', user);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return this.afs
      .collection('users')
      .doc(user.uid)
      .set({
        userData,
        assignedChannel: [],
        Firstname: this.userName.firstName,
        Lastname: this.userName.lastName,
      })
      .then(() => {
        console.log(this.userName.firstName);
      });
  }

  SetGuestData(user: any) {
    console.log('SignUpUserData', user);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return this.afs.collection('users').doc(user.uid).set({
      userData,
      assignedChannel: [],
      Firstname: 'Guest',
      Lastname: 'Account',
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  setUserNameFromFirebase() {
    this.afs
      .collection('users')
      .doc(this.userData.uid)
      .valueChanges()
      .subscribe((userChanges: any) => {
        this.userName.firstName = userChanges['Firstname'];
        this.userName.lastName = userChanges['Lastname'];
        this.backend.setAllChannels(userChanges);
      });
  }
}
