import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  openState: boolean = true;
  subscription: Subscription;

  constructor(private data: DataService, public backend: BackendService) {}

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
}
