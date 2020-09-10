import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import {Room} from '../room';
import {MyDate} from '../my-date';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  currentUser: any;
  room: Room;
  dateFrom: MyDate;
  dateTo: MyDate;

  constructor(private reservationService: ReservationService,
              private readonly router: Router,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!this.currentUser ||
        !this.reservationService.room ||
        !this.reservationService.dateFrom.isValid() ||
        !this.reservationService.dateTo.isValid()) {
      this.router.navigate(['/', 'home']);
    }

    this.room = this.reservationService.room;
    this.dateFrom = this.reservationService.dateFrom;
    this.dateTo = this.reservationService.dateTo;
  }

}
