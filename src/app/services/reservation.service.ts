import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../reservation';
import { MyDate } from '../my-date';
import { Room } from '../room';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  s: string;
  dateFrom: MyDate;
  dateTo: MyDate;
  room: Room;

  constructor(private http: HttpClient) {
    this.s = 'default';
    this.dateFrom = new MyDate();
    this.dateTo = new MyDate();
    this.room = new Room();
    console.log('CONSTRUCTOR OF RESERVATIONSERVICE BITS');
  }

  set(s: string): void {
    this.s = s;
  }

  get(): string {
    return this.s;
  }

  make(r: Reservation): Observable<any> {
      return this.http.post(API_URL, r, { responseType: 'json' });
  }
}
