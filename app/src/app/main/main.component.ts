import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  openState: boolean = false;
  openMobileState: boolean = false;
  subscription: Subscription;
  constructor(private data: DataService, private backend:BackendService) {}

  ngOnInit() {
    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );
    this.subscription = this.data.currentMobileState.subscribe(
      (openMobileState) => (this.openMobileState = openMobileState)
    );

      this.backend.setAllChannels();
  }

  changeMobileState() {
    if (!this.openMobileState) {
      this.data.toggleMobile(true);
    } else if (this.openMobileState) {
      this.data.toggleMobile(false);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
