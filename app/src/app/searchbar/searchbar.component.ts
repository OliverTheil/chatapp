import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  searchInput: string = '';

  constructor(private backend: BackendService) {}

  ngOnInit(): void {}

  search() {
    this.backend.searchInput = this.searchInput;
  }
}
