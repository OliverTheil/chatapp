import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread.class';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserName } from 'src/models/username.class';
import { AuthService } from './auth.service';
import { user } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  threadValues = {
    imgUrl: '',
    text: 'text from thread',
    creator: 'Creator',
    date: Date.now(),
  };
  thread = new Thread(this.threadValues);
  actualChannel: string;
  actualThread: string;
  public allExistsChannels: any;
  public allChannels: any;
  public allMessages: any;
  public allThreads: any;
  public assignedChannel: any = [];
  channelID: string;
  fileName = '';
  

  constructor(private firestore: AngularFirestore, private router: Router, private http: HttpClient) {}

  async setAllChannels(actualUser) {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'channelID' })
      .subscribe((changes: any) => {
        this.allExistsChannels = changes;
        this.allChannels = [];
        this.assignedChannel = [];
        changes.forEach((element) => {
          for (let i = 0; i < actualUser['assignedChannel'].length; i++) {
            if (actualUser['assignedChannel'][i] == element['channelID']) {
              this.allChannels.push(element);
              this.assignedChannel.push(element['channelID']);
            }
          }
        });
      });
  }

  subscribeChannel(userID, channelID) {
    if (!this.assignedChannel.includes(channelID)) {
      this.assignedChannel.push(channelID);
      this.firestore
        .collection('users')
        .doc(userID)
        .update({ assignedChannel: this.assignedChannel });
    }
  }

  async setAllThreats() {
    this.allMessages = [];
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .valueChanges({ idField: 'threatID' })
      .subscribe((changes: any) => {
        this.allThreads = changes;
        console.log('setAllThreads', changes, typeof changes);
      });
  }

  getAllMessagesFromActualThread() {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .doc(this.actualThread)
      .collection('messages')
      .valueChanges({ idField: 'messageID' })
      .subscribe((changesmessages: any) => {
        this.allMessages = changesmessages;
        changesmessages.forEach((element) => {});
      });
  }

  getUserNameFromFirebase(id) {
    let returnName: string;
    this.firestore
      .collection('users')
      .doc(id)
      .valueChanges()
      .subscribe((userChanges: any) => {
        returnName = userChanges['Firstname'] + ' ' + userChanges['Lastname'];
      });
    console.log('get_User:', returnName);
    return returnName;
  }

  createChannel(channelName: string) {
    this.firestore
      .collection('channels')
      .add({ createdOn: Date.now(), channelName: channelName })
      .then((result: any) => {
        this.actualChannel = result.id;
        this.router.navigate(['/chat/' + this.actualChannel]);
      });
  }

  saveThread(thread) {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .add(thread.toJson())
      .then((result: any) => {});
  }

  saveMessage(message) {
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .doc(this.actualThread)
      .collection('messages')
      .add(message.toJson())
      .then((result: any) => {
        console.log('message saved:', result);
      });
  }

  getUserIdFromLocalStorage() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user['uid'];
  }

  getActualDateFormat(timeInMiliseconds) {
    let inputTime = new Date(timeInMiliseconds);
    let year = inputTime.getFullYear();
    let month = inputTime.getMonth() + 1;
    let day = inputTime.getDate();
    let hrs = inputTime.getHours();
    let mins: any = inputTime.getMinutes();
    mins = String(inputTime.getMinutes()).padStart(2, '0');
    mins = mins <= 9 ? '0' + mins : mins;
    return hrs + ':' + mins + ', ' + day + '.' + month + '.' + year;
  }

  onFileSelected(event) {

    const file: File = event.target.files[0];

   /* if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.http.post("/api/thumbnail-upload", formData);
      upload$.subscribe();
    }
    */
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (_event) => {
			this.thread.imgUrl = reader.result; 
		}
  }
}
