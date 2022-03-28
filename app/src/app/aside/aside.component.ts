import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  hideGroup = false;
  constructor() {}

  ngOnInit(): void {}

  toggleHide() {
    if (!this.hideGroup) {
      this.hideGroup = true;
    } else if (this.hideGroup) {
      this.hideGroup = false;
    }
  }
}
