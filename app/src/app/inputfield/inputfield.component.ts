import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread.class';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss']
})
export class InputfieldComponent implements OnInit {
  thread = new Thread;
  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }



  saveThread(){
    console.log('inputfield clicked');
    this.thread.creator = 'Udo';
    this.thread.date = Date.now();
    this.backend.saveThread(this.thread);
    //this.backend.getUserIdFromLocalStorage();
  }


}
