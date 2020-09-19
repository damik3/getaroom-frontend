import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'https://localhost:8443/api/users/';
const HOST_REQ_API_URL = 'https://localhost:8443/api/host-request/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  getUser(id: string): Observable<any> {
    return this.http.get(API_URL + id, { responseType: 'json' });
  }

  updateUser(user): Observable<any> {
      return this.http.put(API_URL + user.id, user, { responseType: 'json' });
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(API_URL + userId, { responseType: 'json' });
  }

  getAllHostReq(): Observable<any> {
    return this.http.get(HOST_REQ_API_URL, { responseType: 'json' });
  }

  approveHostReq(userId): Observable<any> {
    return this.http.post(HOST_REQ_API_URL + userId, { responseType: 'json' });
  }

}
