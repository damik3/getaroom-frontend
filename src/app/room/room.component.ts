import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { PageEvent } from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {SearchQuery} from '../search-query';
import {ReservationService} from '../services/reservation.service';

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

  query: SearchQuery;
  showAll: boolean;
  err: boolean;



  constructor(private roomService: RoomService,
              private readonly activatedRoute: ActivatedRoute,
              private reservationService: ReservationService) { }



  ngOnInit(): void {

    console.log('MESSAJ EST ' + this.reservationService.get());
    if (this.reservationService.dateFrom.isValid()) {
      console.log('dateFrom = ' + this.reservationService.dateFrom.toString());
    }
    if (this.reservationService.dateTo.isValid()) {
      console.log('dateTo = ' + this.reservationService.dateTo.toString());
    }

    this.pageEvent = new PageEvent();
    this.numbers = Array(this.pageSize).fill(1).map((x, i) => i); // [0,1,2,3,4]
    this.query = new SearchQuery();
    this.showAll = false;
    this.err = false;



    this.activatedRoute.queryParams.subscribe((query) => {
      this.query.country = query.country;
      this.query.city = query.city ? query.city : '';
      this.query.area = query.area ? query.area : '';
      this.query.numBeds = +query.numBeds;
      this.query.dateFrom = query.dateFrom;
      this.query.dateTo = query.dateTo;
      console.log('Just received ' + JSON.stringify(this.query));

      if (!this.query.country ||
        !this.query.numBeds ||
        !this.query.dateFrom ||
        !this.query.dateTo) {
        console.log('NULLLLLLLLLL');
        this.showAll = true;
      }

      // Show all rooms
      if (this.showAll) {
        console.log('got into showAll');
        this.roomService.getAll().subscribe(
          data => {
            this.rooms = data;
            this.length = data.length;
            this.err = false;
          },
          () => {
            this.err = true;
          }
        );
      }

      // Show search results
      else {
        console.log('DID NOT got into showAll');
        this.roomService.search(this.query).subscribe(
          data => {
            this.rooms = data;
            this.length = data.length;
            this.err = false;
          },
          () => {
            this.err = true;
          }
        );
      }
    });
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
