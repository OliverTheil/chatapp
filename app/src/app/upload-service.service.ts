import { Injectable, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ref } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, firstValueFrom, Observable, tap, timestamp } from 'rxjs';



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
    
    
    const file: File = event.target.files[0];

    //the storage path
    const path = `files/${new Date().getTime()}_${file.name}`;
    console.log(path);
    const ref = this.storage.ref(path);
    console.log(ref);
    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(async () => {
        console.log("FINALIZE UPLOAD################################################################################");                                     // after the observable completes, get the file's download URL
        this.downloadURL = await firstValueFrom(ref.getDownloadURL());
        console.log(this.downloadURL);

        this.firestore.collection('files').add({
          storagePath: path,
          downloadURL: this.downloadURL,
          originalName: file.name,
        }).then(function () {
          console.log('document written!');
        })
          .catch(function (error) {
            console.error('Error writing document:', error);
          });
      })
    ).subscribe()


  
console.log(this.downloadURL)   
    
  }


  isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred<snapshot.totalBytes
}
}
