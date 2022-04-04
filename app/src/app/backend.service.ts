import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread.class';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  threadValues = {
    imgUrl: 'url to Image 2',
    text: 'text from thread',
    creator: 'Creator',
    date: Date.now(),
  };
  thread = new Thread(this.threadValues);
  actualChannel: string;
  actualThread: string;
  public allChannels: any;
  public allMessages: any;
  public allThreads: any;
  channelID: string;

  userId = '';

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setAllChannels();
  }

  async setAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'channelID' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        changes.forEach((element) => { });
      });
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
        changesmessages.forEach((element) => { });
      });
  }

  createChannel(channelName: string) {
    this.firestore
      .collection('channels')
      .add({ createdOn: Date.now(), channelName: channelName })
      .then((result: any) => {
        this.actualChannel = result.id;
        this.router.navigate(['/main/' + this.actualChannel]);
      });
  }

  saveThread(thread) {

    this.firestore
      .collection('channels')
      .doc(this.channelID)
      .collection('Threads')
      .add(thread.toJson())
      .then((result: any) => { });
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
      })
  }

  getUserName() {
    let name;
    name = this.firestore
      .collection('users')
      .doc(this.userId)
      .get()
  }

  getUserId() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    })

    console.log('ID', this.userId)
    this.getUserName();


  }



  getUserIdFromLocalStorage() {
    console.log('userIdLocal:', JSON.parse(localStorage.getItem('user')));
  }
}
