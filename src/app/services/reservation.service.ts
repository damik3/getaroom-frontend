import { Injectable } from '@angular/core';
import { Reservation } from '../reservation';
import { MyDate } from '../my-date';
import { Room } from '../room';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  s: string;
  dateFrom: MyDate;
  dateTo: MyDate;
  room: Room;

  constructor() {
    this.s = 'default';
    this.dateFrom = new MyDate();
    this.dateTo = new MyDate();
    console.log('CONSTRUCTOR OF RESERVATIONSERVICE BITS');
  }

  set(s: string): void {
    this.s = s;
  }

  get(): string {
    return this.s;
  }
}
