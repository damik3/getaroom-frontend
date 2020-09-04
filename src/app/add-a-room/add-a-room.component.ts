import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Room } from '../room';
import { User } from '../user';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-add-a-room',
  templateUrl: './add-a-room.component.html',
  styleUrls: ['./add-a-room.component.css']
})
export class AddARoomComponent implements OnInit {

  currentUser: any;
  isHost: any;
  room: Room;
  success: boolean;

  constructor(private token: TokenStorageService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.success = false;
    this.currentUser = this.token.getUser();
    this.room = new Room();
    this.room.owner = new User();
    this.room.owner.id = this.currentUser.id;

    if (this.currentUser) {
      this.isHost = this.currentUser.roles.includes('ROLE_HOST');
    }
  }

  save(): void {
    console.log('Gonna save ' + JSON.stringify(this.room));

    this.roomService.put(this.room).subscribe(
      data => {
        this.success = true;
      }
    );
  }

}
