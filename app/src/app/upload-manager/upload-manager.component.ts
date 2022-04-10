import { Component, OnInit } from '@angular/core';
/*import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';*/
import { Observable } from 'rxjs';



@Component({
  selector: 'app-upload-manager',
  templateUrl: './upload-manager.component.html',
  styleUrls: ['./upload-manager.component.scss']
})
export class UploadManagerComponent implements OnInit {
 /* task: AngularFireUploadTask;*/

  percentage: Observable<number>;

  snapshot: Observable<any>;
  downloadURL: Observable<string>

  /*constructor(private storage: AngularFireStorage) { }*/

  ngOnInit(): void {
  }
  isHovering:boolean;
  files: File[] = [];


  toggleHover(event: any) {
      this.isHovering = event;
  }

 

  startUpload(event: FileList) {

    const file = event.item(0);

    //the storage path

    const path = `files/${new Date().getTime}_${file.name}`;

    

    //this.task = this.storage.upload(path, file)

   // this.percentage = this.task.percentageChanges();
    //this.snapshot = this.task.snapshotChanges();
    
    
  }


}
