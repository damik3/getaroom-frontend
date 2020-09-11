import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../reservation';
import { MyDate } from '../my-date';
import { Room } from '../room';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/reservations/';

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
    console.log('CONSTRUCTOR OF RESERVATION SERVICE BITS');
  }

  make(r: Reservation): Observable<any> {
    return this.http.post(API_URL, r, { responseType: 'json' });
  }

  getUserReservations(id: number): Observable<any> {
    return this.http.get(API_URL + 'user/' + id.toString(), { responseType: 'json' });
  }
}
