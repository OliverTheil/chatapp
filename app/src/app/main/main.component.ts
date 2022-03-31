import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  openState: boolean = false;
  subscription: Subscription;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
