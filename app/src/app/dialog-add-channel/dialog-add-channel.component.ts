import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  channelName: string;
  channelNameAdd: string;
  userID: string = this.authService.userData.uid;

  constructor(
    public backend: BackendService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
  createChannel() {
    console.log('create Channel Dialog:', this.channelName);
    this.backend.createChannel(this.userID, this.channelName);
    
    this.backToChat();
  }

  abort() {}

  addChannel(channelID) {
    console.log('adChannel channelID: ', channelID);
    this.backend.subscribeChannel(this.userID, channelID);
    this.router.navigate(['/chat/' + channelID]);
  }

  backToChat() {
    this.router.navigate(['/chat/' + this.authService.userData.uid]);
  }
}
