import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  channelName: string;
  channelNameAdd: string;
  constructor(public backend: BackendService, public router: Router) {}

  ngOnInit(): void {}
  createChannel() {
    console.log('create Channel Dialog:', this.channelName);

    this.backend.createChannel(this.channelName);
  }

  abort() {}

  addChannel(channelID) {
    console.log('adChannel channelID: ', channelID);
    this.router.navigate(['/main/']);
  }
}
