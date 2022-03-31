import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;
  public open = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  toggleMessage() {
    if (!this.open) {
      this.open = true;
    } else if (this.open) {
      this.open = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
