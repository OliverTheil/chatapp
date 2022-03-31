import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newMessage() {
    this.data.changeMessage('Hello from Sibling');
  }
}
