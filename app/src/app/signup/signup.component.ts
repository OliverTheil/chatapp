import { Component, OnInit } from '@angular/core';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userName: UserName = new UserName();
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
