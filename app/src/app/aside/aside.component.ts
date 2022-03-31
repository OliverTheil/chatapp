import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  hideGroup = false;
  userClicked = false;
  changePic = false;
  changeName = false;

  constructor() {}

  ngOnInit(): void {}

  toggleHide() {
    if (!this.hideGroup) {
      this.hideGroup = true;
    } else if (this.hideGroup) {
      this.hideGroup = false;
    }
  }
  openUserEdit() {
    if (!this.userClicked) {
      this.userClicked = true;
    } else if (this.userClicked) {
      this.userClicked = false;
    }
  }

  showChangePicture() {
    if (!this.changePic) {
      this.changeName = false;
      this.changePic = true;
    } else if (this.changePic) {
      this.changePic = false;
    }
  }

  showChangeName() {
    if (!this.changeName) {
      this.changePic = false;
      this.changeName = true;
    } else if (this.changeName) {
      this.changeName = false;
    }
  }

  saveChanges() {
    /**
     * ! FIRESTORE
     */
  }
}
