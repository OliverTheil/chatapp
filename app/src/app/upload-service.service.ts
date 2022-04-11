import { Injectable, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ref } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, Observable, tap, timestamp } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  @Input() file: File;
  
  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  currentFile: String;
 


  constructor(private storage: AngularFireStorage, public firestore: AngularFirestore) { }

  async startUpload(event) {
    ;
    const file_ID = timestamp + '_' + Math.random() + 100 * 10;
  ;
    

    const file: File = event.target.files[0];

    //the storage path

    const path = `files/${new Date().getTime()}_${file.name}`;

    this.task = this.storage.upload(path, file);
    const ref = this.storage.ref(path);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(tap(console.log),
    finalize(async () => {                                      // after the observable completes, get the file's download URL
        this.downloadURL = await ref.getDownloadURL();

        this.firestore.collection('files').doc(file_ID).set({
            storagePath: path,
            downloadURL: this.downloadURL,
            originalName: file,
          
        })
            .then(function () {
                console.log('document written!');
            })
            .catch(function (error) {
                console.error('Error writing document:', error);
            });
    }),
);
  
     
    
  }


  isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred<snapshot.totalBytes
}
}
