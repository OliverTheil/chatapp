import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend.service';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserName } from 'src/models/username.class';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, user } from '@angular/fire/auth';

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
  username: UserName;
  userId = '';

  constructor(
    public afs: AngularFirestore,
    public router: Router,
    private data: DataService,
    public backend: BackendService,
    public AuthService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMobileState.subscribe(
      (openMobileState) => (this.openMobileState = openMobileState)
    );

    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
    })
    this.getUserName();



  }

  getUserName() {
    this.afs
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((username) => {
        this.username = new UserName(username)
        this.username.firstName
      })

  }




  openDialogAddChannel() { }

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
  }
  // getUserData() {

  //   this.afs
  //     .collection('users')
  //     .doc(this.AuthService.userData.uid)
  //     .valueChanges()
  //     .subscribe(() => {
  //       console.log(this.username.firstName)

  //     })

  // }
}
