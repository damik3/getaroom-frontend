import { Component, OnInit } from '@angular/core';
import {UploadPhotosService} from '../services/upload-photos.service';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-view-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnInit {

  photos: any;
  roomId: string;
  error = '';
  numbers = null;

  // Mat paginator vars
  // MatPaginator inputs
  length: number;
  pageSize = 9;
  pageEvent: PageEvent;

  constructor(private uploadPhotosService: UploadPhotosService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.pageEvent = new PageEvent();
    this.numbers = Array(this.pageSize).fill(1).map((x, i) => i); // [0,1,2,3,4]

    this.roomId = this.route.snapshot.paramMap.get('id');

    this.uploadPhotosService.getRoomPhotos(String(this.roomId)).subscribe(
      data => {
        this.photos = data;
        this.length = data.length;
      },
      () => {
        this.error = 'Something unexpected happened!';
      }
    );
  }



  getPhoto(i: number) {
    if (!this.length) {
      return null;
    }

    if ((i < 0) || (this.length <= i)) {
      return null;
    }
    else {
      return this.photos[i];
    }
  }



  getPageIndex() {
    if (!this.pageEvent.pageIndex) {
      return 0;
    }
    else {
      return this.pageEvent.pageIndex;
    }
  }
}
