import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


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
  mobileAsideActive = false;
  openMobileState = false;
  subscription: Subscription;
  allChannels = [];
  userId = '';
  username: UserName = new UserName();
  constructor(private route: ActivatedRoute, public afs: AngularFirestore, public authService: AuthService, public router: Router, private data: DataService, public backend: BackendService) {

  }

  ngOnInit(): void {
    this.subscription = this.data.currentMobileState.subscribe(
      (openMobileState) => (this.openMobileState = openMobileState)
    );
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    })

    console.log('ID', this.userId)
    this.getUserName();


  }
  getUserName() {
    this.afs
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((username: UserName) => {

        this.username = new UserName(username)

      })

    console.log('username', this.username)

  }
  openDialogAddChannel() {

  }

  changeMobileState() {
    if (!this.openMobileState) {
      this.data.toggleMobile(true);
    } else if (this.openMobileState) {
      this.data.toggleMobile(false);
    }
  }

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


  openChannel(id: string) {
    this.router.navigate(['/main/' + id]);
    console.log('openChannel: ', id);
  }


}
