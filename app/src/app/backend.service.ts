import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread.class';
import { collection, query, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  threadValues = {
    imgUrl : 'url to Image 2',
    text : 'text from thread',
    creator : 'Creator',
    date : Date.now()
  }
  thread = new Thread(this.threadValues);
  actualChannel: string;
  public allChannels:any;

  constructor(private firestore: AngularFirestore) { 
    this.setAllChannels();
  }

async setAllChannels(){

this.firestore
  .collection('channels')
  .valueChanges({idField: 'channelID'})
  .subscribe((changes: any) => {
    this.allChannels = changes;
    console.log('backend allChannels changes: ', changes);
    console.log('backend allChannels:', this.allChannels);
    changes.forEach(element =>{
      console.log('idField: ', element);
    })
  });
}

  createChannel(channelName:string){
  
    this.firestore
    .collection('channels')
    .add({'createdOn':Date.now(), 'channelName': channelName})
    .then((result: any) =>{
      console.log('createChannel: ', channelName, result.id);
      this.actualChannel = result.id;
      
    })
    
  }
  
  
  saveThread(){
    this.threadValues.date = Date.now();
    this.firestore
    .collection('channels')
    .doc(this.actualChannel)
    .collection('Threads')
    .add(this.thread.toJson())
    .then((result: any) =>{
      console.log('create Thread: ', this.thread)
    })
  }
  
  
  
  getAllChannels(){
return this.allChannels;
   
    
  }

  
}
