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
  thread = new Thread;
  constructor(private authService: AuthService, private data: DataService, public backend: BackendService) {}

  ngOnInit(): void {
    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );


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

  saveMessage(){
    this.thread.creator = this.authService.userName.firstName + ' ' + this.authService.userName.lastName;;
    this.thread.date = this.backend.getActualDateFormat(Date.now());
    this.backend.saveMessage(this.thread);
  }


}
