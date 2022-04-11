import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  openState: boolean = false;
  subscription: Subscription;
  channelID: string;
  allMessages: any;

  constructor(
    public backend: BackendService,
    private data: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.backend.channelID = params['id'];
      this.backend.setAllThreats();
    });

    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );
  }

  changeState(id) {
    this.backend.actualThread = id;
    this.backend.getAllMessagesFromActualThread();
    if (!this.openState) {
      this.data.toggleOpen(true);
    } else if (this.openState) {
      this.data.toggleOpen(true);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
