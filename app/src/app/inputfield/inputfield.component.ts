import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread.class';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';
import { UploadServiceService } from '../upload-service.service';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss'],
})
export class InputfieldComponent implements OnInit {
  thread = new Thread();
  bold = false;
  italic = false;
  code = false;
  clear: '';

  constructor(
    public backend: BackendService,
    private authService: AuthService,
    public upload: UploadServiceService
  ) {}

  ngOnInit(): void {}

  boldFont() {
    if (!this.bold) {
      this.bold = true;
      this.thread.bold = true;
    } else if (this.bold) {
      this.bold = false;
      this.thread.bold = false;
    }
  }

  italicFont() {
    if (!this.italic) {
      this.italic = true;
      this.thread.italic = true;
    } else if (this.italic) {
      this.italic = false;
      this.thread.italic = false;
    }
  }

  codeFont() {
    if (!this.code) {
      this.code = true;
      this.thread.code = true;
    } else if (this.code) {
      this.code = false;
      this.thread.code = false;
    }
  }

  saveThread() {
    if (this.thread.text != '' || this.upload.downloadURL != null) {
      this.thread.creator =
        this.authService.userName.firstName +
        ' ' +
        this.authService.userName.lastName;
      this.thread.dateInMs = Date.now();
      this.thread.date = this.backend.getActualDateFormat(Date.now());
      this.thread.imgUrl = this.upload.downloadURL;
      this.backend.saveThread(this.thread);
      this.upload.downloadURL = null;
      this.thread.imgUrl = '';
      this.thread.text = '';
      this.clear = '';
    }
  }
}
