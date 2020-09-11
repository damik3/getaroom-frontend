import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../reservation';
import { Router } from '@angular/router';
import { Room } from '../room';
import { MyDate } from '../my-date';
import { TokenStorageService } from '../services/token-storage.service';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  days = MyDate.days;
  months = MyDate.months;
  years = MyDate.years;

  currentUser: any;
  room: Room;
  dateFrom: MyDate;
  dateTo: MyDate;
  invalidInput: boolean;



  constructor(private reservationService: ReservationService,
              private readonly router: Router,
              private token: TokenStorageService) { }



  ngOnInit(): void {

    // If user is not logged in, or somehow no room has been selected,
    // redirect to /home
    this.currentUser = this.token.getUser();
    if (!this.currentUser ||
        !this.reservationService.room.id) {
      this.router.navigate(['/', 'home']);
    }

    // If dates have been selected, present them
    if (!this.reservationService.dateFrom.isValid() ||
        !this.reservationService.dateTo.isValid()) {
            this.reservationService.dateFrom.set(this.years[0], this.months[0], this.days[0]);
            this.reservationService.dateTo.set(this.years[0], this.months[0], this.days[0]);
    }

    this.room = this.reservationService.room;
    this.dateFrom = this.reservationService.dateFrom;
    this.dateTo = this.reservationService.dateTo;
    this.invalidInput = false;
  }



  makeReservation(): void {

    // Check validity of dates
    // TODO: check dateFrom < dateTo
    if (!this.dateFrom.isValid() ||
        !this.dateTo.isValid() ||
        !this.dateFrom.isBefore(this.dateTo)) {
      this.invalidInput = true;
      return;
    }

    this.invalidInput = false;

    const r = new Reservation();
    r.user.id = this.currentUser.id;
    r.room.id = this.room.id;
    r.room.owner = null;

    // TODO: set price = (dateTo - dateFrom) * pricePerDay
    r.price = 0;
    r.dateFrom = this.dateFrom.toString();
    r.dateTo = this.dateTo.toString();

    console.log('GONNA MAKE RESERVE ' + JSON.stringify(r));

    this.reservationService.make(r).subscribe(
        data => {
            console.log('YOU JUST MADE IT');
            console.log(JSON.stringify(data));
            this.router.navigate(['/', 'user-reservations']);
        }
    );
  }

}
