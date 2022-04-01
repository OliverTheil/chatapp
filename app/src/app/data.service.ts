import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  constructor() {}
  private open = new BehaviorSubject(false);
  currentState = this.open.asObservable();

  toggleOpen(openState: boolean) {
    this.open.next(openState);
  }

  private mobileToggle = new BehaviorSubject(false);
  currentMobileState = this.mobileToggle.asObservable();

  toggleMobile(mobileState: boolean) {
    this.mobileToggle.next(mobileState);
  }
}
