import { Component, OnInit } from '@angular/core';
import {UploadPhotosService} from '../services/upload-photos.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnInit {

  photos: any;
  roomId: string;
  error = '';

  constructor(private uploadPhotosService: UploadPhotosService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.roomId = this.route.snapshot.paramMap.get('id');

    this.uploadPhotosService.getRoomPhotos(String(this.roomId)).subscribe(
      data => {
        this.photos = data;
      },
      () => {
        this.error = 'Something unexpected happened!';
      }
    );

  }

}
