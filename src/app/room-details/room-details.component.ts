import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../room';
import { TokenStorageService } from '../services/token-storage.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  room: Room;
  currentUser: any;

  constructor(private reservationService: ReservationService,
              private readonly router: Router,
              private roomService: RoomService,
              private route: ActivatedRoute,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!this.currentUser) {
      return;
    }

    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.get(String(id)).subscribe(
      data => {
        this.room = data;
        console.log('room = ' + this.room);
      }
    );
  }



  book(): void {
    console.log('gonna book some ass');
    this.reservationService.room.set(this.room);
    this.router.navigate(['/', 'reservation']);
  }

}
