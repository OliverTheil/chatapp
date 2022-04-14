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
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  userSearch = false;
  mobileAsideActive = false;
  openMobileState = false;
  subscription: Subscription;
  searchInput: string = '';

  username: UserName;
  userId = '';

  constructor(
    public afs: AngularFirestore,
    public router: Router,
    private data: DataService,
    public backend: BackendService,
    public AuthService: AuthService,
    private route: ActivatedRoute,
    public auth: AngularFireAuth,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMobileState.subscribe(
      (openMobileState) => (this.openMobileState = openMobileState)
    );

    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
    });
    this.getUserName();
  }

  getUserName() {
    this.afs
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((username) => {
        this.username = new UserName(username);
        this.username.firstName;
      });
  }

  changeMobileState() {
    if (!this.openMobileState) {
      this.data.toggleMobile(true);
    } else if (this.openMobileState) {
      this.data.toggleMobile(false);
    }
  }

  openChannel(id: string) {
    this.router.navigate(['/chat/' + id]);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['']);
  }

  search() {
    this.backend.searchUser = this.searchInput;
  }
}
