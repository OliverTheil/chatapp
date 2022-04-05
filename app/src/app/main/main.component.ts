import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserName } from 'src/models/username.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  openState: boolean = false;
  openMobileState: boolean = false;
  subscription: Subscription;
  channelID: string;

  userId = '';
  username: UserName = new UserName();


  constructor(private data: DataService, private backend: BackendService, private route: ActivatedRoute, public afs: AngularFirestore) { }

  ngOnInit() {

    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );
    this.subscription = this.data.currentMobileState.subscribe(
      (openMobileState) => (this.openMobileState = openMobileState)
    );

    this.backend.setAllChannels();
    this.getUserId();
    this.getUserName()
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

  getUserId() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    })

    console.log('ID', this.userId)
    this.getUserName();


  }

  getUserName() {

    this.afs
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe(() => {
        this.username = new UserName(this.username)

      })

  }
}
