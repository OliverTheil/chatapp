import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread.class';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss'],
})
export class InputfieldComponent implements OnInit {
  thread = new Thread();
  clear: '';

  constructor(
    public backend: BackendService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  saveThread() {
    if (this.thread.text != '') {
      this.thread.creator =
        this.authService.userName.firstName +
        ' ' +
        this.authService.userName.lastName;
      this.thread.dateInMs = Date.now();
      this.thread.date = this.backend.getActualDateFormat(Date.now());
      this.backend.saveThread(this.thread);
      this.clear = '';
    }
  }
}
