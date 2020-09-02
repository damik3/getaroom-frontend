import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../services/room.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms = null;

  numbers = null;

  // MatPaginator inputs
  length: number;
  pageSize = 4;

  // MatPaginator output
  pageEvent: PageEvent;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent();

    this.numbers = Array(this.pageSize).fill(1).map((x, i) => i); // [0,1,2,3,4]

    this.roomService.getAll().subscribe(
      data => {
        this.rooms = data;
        this.length = data.length;
      },
      err => {
        this.rooms = JSON.parse(err.error).message;
      }
    );
  }

  getPageIndex() {
    if (!this.pageEvent.pageIndex) {
      return 0;
    }
    else {
      return this.pageEvent.pageIndex;
    }
  }

  getRoom(i: number) {
      if (!this.length) {
        return null;
      }

      if ((i < 0) || (this.length <= i)) {
          return null;
      }
      else {
          return this.rooms[i];
      }
  }

}
