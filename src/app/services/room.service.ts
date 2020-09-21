import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { SearchQuery } from '../search-query';
import {main} from '@angular/compiler-cli/src/main';

const API_URL = 'https://localhost:8443/api/rooms/';
const SEARCH_API_URL = 'https://localhost:8443/api/search/';

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

  search(searchQuery: SearchQuery): Observable<any> {
    return this.http.post(SEARCH_API_URL, searchQuery, { responseType: 'json' });
  }

  addMainPhoto(roomId: string, mainPhotoUrl: string): Observable<any> {
    return this.http.post(API_URL + roomId + '/' + 'add-main-photo', {url: mainPhotoUrl}, {responseType: 'json'});
  }
}
