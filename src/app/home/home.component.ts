import { Component, OnInit } from '@angular/core';
import { SearchQuery } from '../search-query';
import { MyDate } from '../my-date';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Sad I know...
  years = [2021];
  months = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  days = [2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  query: SearchQuery;
  dateFrom: MyDate;
  dateTo: MyDate;

  constructor() {
    this.query = new SearchQuery();
    this.dateFrom = new MyDate();
    this.dateTo = new MyDate();
  }

  ngOnInit(): void {
      this.dateFrom.set(2020, 3, 200);
      if (this.dateFrom.isValid()) {
        console.log('dateFrom = ' + this.dateFrom.toString());
      }
  }

}
