import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';
import { Thread } from 'src/models/thread.class';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  openState: boolean = true;
  subscription: Subscription;
  bold = false;
  italic = false;
  code = false;
  thread = new Thread();
  clear: '';
  constructor(
    private authService: AuthService,
    private data: DataService,
    public backend: BackendService
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );
  }

  boldFont() {
    if (!this.bold) {
      this.bold = true;
      this.thread.bold = true;
    } else if (this.bold) {
      this.bold = false;
      this.thread.bold = false;
    }
  }

  italicFont() {
    if (!this.italic) {
      this.italic = true;
      this.thread.italic = true;
    } else if (this.italic) {
      this.italic = false;
      this.thread.italic = false;
    }
  }

  codeFont() {
    if (!this.code) {
      this.code = true;
      this.thread.code = true;
    } else if (this.code) {
      this.code = false;
      this.thread.code = false;
    }
  }

  changeState() {
    if (!this.openState) {
      this.data.toggleOpen(true);
    } else if (this.openState) {
      this.data.toggleOpen(false);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveMessage() {
    if (this.thread.text != '') {
      this.thread.creator =
        this.authService.userName.firstName +
        ' ' +
        this.authService.userName.lastName;
      this.thread.dateInMs = Date.now();
      this.thread.date = this.backend.getActualDateFormat(Date.now());
      this.backend.saveMessage(this.thread);
      this.thread.text = '';
      this.clear = '';
    }
  }
}
