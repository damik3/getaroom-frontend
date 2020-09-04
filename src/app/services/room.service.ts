import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Room} from '../room';

const API_URL = 'http://localhost:8080/api/rooms/';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  get(id: string): Observable<any> {
    return this.http.get(API_URL + id, { responseType: 'json' });
  }

  put(room: Room): Observable<any> {
    return this.http.post(API_URL, room, { responseType: 'json' });
  }
}
