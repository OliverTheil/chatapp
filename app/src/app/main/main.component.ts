import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserName } from 'src/models/username.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';

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




  constructor(private authService: AuthService, private data: DataService, private backend: BackendService, private route: ActivatedRoute, public afs: AngularFirestore) { }

  ngOnInit() {

    this.subscription = this.data.currentState.subscribe(
      (openState) => (this.openState = openState)
    );
    this.subscription = this.data.currentMobileState.subscribe(
      (openMobileState) => (this.openMobileState = openMobileState)
    );


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
