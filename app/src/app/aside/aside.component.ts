import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  hideFav = false;
  hideChannel = false;
  hideDirects = false;
  userClicked = false;
  changePic = false;
  changeName = false;

  constructor() {}

  ngOnInit(): void {}

  toggleFav() {
    if (!this.hideFav) {
      this.hideFav = true;
    } else if (this.hideFav) {
      this.hideFav = false;
    }
  }

  toggleChannel() {
    if (!this.hideChannel) {
      this.hideChannel = true;
    } else if (this.hideChannel) {
      this.hideChannel = false;
    }
  }

  toggleDirects() {
    if (!this.hideDirects) {
      this.hideDirects = true;
    } else if (this.hideDirects) {
      this.hideDirects = false;
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
