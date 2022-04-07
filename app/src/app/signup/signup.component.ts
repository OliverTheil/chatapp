import { Component, OnInit } from '@angular/core';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userName: UserName = new UserName();
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}
}
