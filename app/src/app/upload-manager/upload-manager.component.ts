import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ref } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, Observable, tap, timestamp } from 'rxjs';


@Component({
  selector: 'app-upload-manager',
  templateUrl: './upload-manager.component.html',
  styleUrls: ['./upload-manager.component.scss']
})
export class UploadManagerComponent implements OnInit {
  @Input() file: File;
  
  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  currentFile: String;
 



  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }
 
 


  toggleHover(event: any) {
      this.isHovering = event;
  }

 

  async startUpload(event) {

    

    const file: File = event.target.files[0];

    //the storage path

    const path = `files/${new Date().getTime()}_${file.name}`;

    

    this.task = this.storage.upload(path, file);
    const ref = this.storage.ref(path);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => (this.currentFile = url));
      })
      )
      .subscribe();
    
  }

  isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred<snapshot.totalBytes
}
}
