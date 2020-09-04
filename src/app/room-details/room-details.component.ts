import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  room: Room;

  constructor(private roomService: RoomService,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.get(String(id)).subscribe(
      data => {
        this.room = data;
        console.log('room = ' + this.room);
      }
    );
  }

}
