import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private open = new BehaviorSubject(false);
  currentState = this.open.asObservable();

  constructor() {}
  toggleOpen(openState: boolean) {
    this.open.next(openState);
  }
}
