import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { PageEvent } from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {SearchQuery} from '../search-query';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms = null;
  numbers = null;

  // MatPaginator
  length: number;
  pageEvent: PageEvent;

  // Rooms per page
  pageSize = 10;

  query: SearchQuery;
  showAll: boolean;
  err: boolean;



  constructor(private roomService: RoomService,
              private readonly activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {

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

      if (!this.query.country ||
        !this.query.numBeds ||
        !this.query.dateFrom ||
        !this.query.dateTo) {
        this.showAll = true;
      }

      // Show all rooms
      if (this.showAll) {
        this.roomService.getAll().subscribe(
          data => {
            this.rooms = data;

            // Sort rooms from lowest price to highest
            this.rooms = this.rooms.sort((n1, n2) => {
              if (n1.pricePerDay > n2.pricePerDay) {
                return 1;
              }
              if (n1.pricePerDay < n2.pricePerDay) {
                return -1;
              }
              return 0;
            });

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
        this.roomService.search(this.query).subscribe(
          data => {
            this.rooms = data;

            // Sort rooms from lowest price to highest
            this.rooms = this.rooms.sort((n1, n2) => {
              if (n1.pricePerDay > n2.pricePerDay) {
                return 1;
              }
              if (n1.pricePerDay < n2.pricePerDay) {
                return -1;
              }
              return 0;
            });

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
