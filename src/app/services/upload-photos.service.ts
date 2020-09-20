import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:8443/api';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotosService {

  constructor(private http: HttpClient) { }

  upload(file: File, roomId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('roomId', roomId);

    const req = new HttpRequest('POST', `${API_URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }



  getRoomPhotos(roomId: string): Observable<any> {
    return this.http.get(API_URL + '/files/room/' + roomId, { responseType: 'json' });
  }
}
