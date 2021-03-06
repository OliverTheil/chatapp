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
import Swal from 'sweetalert2';
import { time } from 'console';
import { first } from 'rxjs-compat/operator/first';

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

  selectedUserData = {
    uid: '',
    firstname: '',
    lastname: '',
  };
  thread = new Thread(this.threadValues);
  actualChannel: string;
  actualThread: string;
  public allExistsChannels: any;
  public allChannels: any;
  public allMessages: any;
  public allThreads: any;
  public assignedChannel: any = [];
  public allUser: any;
  public userSelected: any = [];
  imageLoaded = false;
  isAlreadyPushed = false;
  searchInput = '';
  searchUser = '';
  search = false;
  channelID: string;
  fileName = '';
  Url: any;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private http: HttpClient
  ) {}

  async setAllChannels(actualUser) {
    console.log('setAllchannels');
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'channelID' })
      .subscribe((changes: any) => {
        this.allChannels = [];
        this.assignedChannel = [];
        this.allExistsChannels = [];
        changes.forEach((element) => {
          this.checkIfAlreadySubscribed(actualUser, element);
          this.addToExistsChannelIfnotAlreadyAdded(element);
        });
      });
  }

  async setAllUser() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userIDs' })
      .subscribe((changes: any) => {
        this.allUser = [];
        changes.forEach((element, index) => {
          this.allUser.push(element);
        });
      });
  }

  getSelectedUser(user) {
    this.firestore
      .collection('users')
      .doc(user)
      .valueChanges()
      .subscribe((changes: any) => {
        this.userSelected = changes['userSelected'];
      });
  }

  selectedUser(first, last, userIDs, user) {
    this.selectedUserData = {
      uid: userIDs,
      firstname: first,
      lastname: last,
    };
    this.userSelected.push(this.selectedUserData);
    this.firestore
      .collection('users')
      .doc(user)
      .update({ userSelected: this.userSelected });

    console.log('JSON', this.selectedUserData);
    console.log('ARRAY', this.userSelected);
  }

  checkIfAlreadySubscribed(actualUser, element) {
    for (let i = 0; i < actualUser['assignedChannel'].length; i++) {
      if (actualUser['assignedChannel'][i] == element['channelID']) {
        this.allChannels.push(element);
        this.isAlreadyPushed = true;
        this.assignedChannel.push(element['channelID']);
      }
    }
  }

  addToExistsChannelIfnotAlreadyAdded(element) {
    if (!this.isAlreadyPushed) {
      this.allExistsChannels.push(element);
    }
    this.isAlreadyPushed = false;
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

  createChannel(userID, channelName: string) {
    this.firestore
      .collection('channels')
      .add({ createdOn: Date.now(), channelName: channelName })
      .then((result: any) => {
        this.actualChannel = result.id;
        this.router.navigate(['/chat/' + this.actualChannel]);
        this.subscribeChannel(userID, this.actualChannel);
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

  saveThread(thread) {
    if (!thread.imgUrl) {
      thread.imgUrl = '';
    }
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .doc(thread.dateInMs.toString())
      .set(thread.toJson())
      .then((result: any) => {});
  }

  saveMessage(message) {
    console.log('actualThread:', this.actualThread);
    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .doc(this.actualThread)
      .collection('messages')
      .doc(message.dateInMs.toString())
      .set(message.toJson())
      .then((result: any) => {});
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
    mins = String(inputTime.getMinutes()).padStart(1, '0');
    mins = mins <= 9 ? '0' + mins : mins;
    return hrs + ':' + mins + ', ' + day + '.' + month + '.' + year;
  }

  errorMessage(error) {
    return Swal.fire({
      position: 'center',
      background: 'rgb(39, 39, 39)',
      icon: 'error',
      title: error,
      heightAuto: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
