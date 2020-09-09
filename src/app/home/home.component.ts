import { Component, OnInit } from '@angular/core';
import { SearchQuery } from '../search-query';
import { MyDate } from '../my-date';
import {Router} from '@angular/router';
import {Validate} from '../helpers/validate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Sad I know...
  years = [2020, 2021];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  query: SearchQuery;
  dateFrom: MyDate;
  dateTo: MyDate;
  invalidInput = false;

  constructor(private readonly router: Router) {
    this.query = new SearchQuery();
    this.dateFrom = new MyDate();
    this.dateFrom.set(2020, 1, 1);
    this.dateTo = new MyDate();
    this.dateTo.set(2020, 1, 1);
  }

  ngOnInit(): void {
      this.dateFrom.set(2020, 3, 200);
      if (this.dateFrom.isValid()) {
        console.log('dateFrom = ' + this.dateFrom.toString());
      }
  }

  search(): void {

    // Check validity before submitting
    if (!Validate.text(this.query.country) ||
        !this.query.numBeds ||
        !this.dateFrom.isValid() ||
        !this.dateTo.isValid()) {
      console.log('INPUT ERROR');
      this.invalidInput = true;
      return;
    }

    this.invalidInput = false;

    // Make dates into string
    this.query.dateFrom = this.dateFrom.toString();
    this.query.dateTo = this.dateTo.toString();

    // ...???
    const queryParams = this.query;

    // Send data to ResultsComponent
    this. router.navigate(['/', 'rooms'], {
      queryParams
    });
  }

}
