import { Component, OnInit } from '@angular/core';
import { SearchQuery } from '../search-query';
import { MyDate } from '../my-date';
import { Router } from '@angular/router';
import { Validate } from '../helpers/validate';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  days = MyDate.days;
  months = MyDate.months;
  years = MyDate.years;
  query: SearchQuery;
  dateFrom: MyDate;
  dateTo: MyDate;
  invalidInput = false;

  constructor(private readonly router: Router,
              private reservationService: ReservationService) {
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
        !this.dateTo.isValid() ||
        !this.dateFrom.isBefore(this.dateTo)) {
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

    this.reservationService.set('HOLA');
    console.log('HOLA IS SET');
    this.reservationService.dateFrom.set2(this.dateFrom);
    this.reservationService.dateTo.set2(this.dateTo);

    // Send data to ResultsComponent
    this.router.navigate(['/', 'rooms'], {
      queryParams
    });
  }

}
