import { Component, OnInit } from '@angular/core';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '@angular/fire/auth';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  firstname = '';
  lastname = '';
  userName: UserName = new UserName();
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public backend: BackendService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  signUp() {
    this.authService.userName.firstName = this.firstname;
    this.authService.userName.lastName = this.lastname;
    if (
      this.email.length != 0 &&
      this.password.length != 0 &&
      this.firstname.length != 0 &&
      this.lastname.length != 0
    ) {
      this.authService.SignUp(this.email, this.password);
      this.router.navigate(['']);
      Swal.fire({
        position: 'center',
        background: 'rgb(39, 39, 39)',
        icon: 'success',
        title: 'Nice! You have been added!',
        heightAuto: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      this.backend.errorMessage('Please enter all your data!');
    }
  }
}
