import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Room } from '../room';
import { RoomService } from '../services/room.service';
import { Validate } from '../helpers/validate';

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
  invalidInput: boolean;

  constructor(private token: TokenStorageService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.room = new Room();
    this.room.owner.id = this.currentUser.id;
    this.success = false;
    this.invalidInput = false;

    if (this.currentUser) {
      this.isHost = this.currentUser.roles.includes('ROLE_HOST');
    }
  }

  save(): void {

    if (!Validate.text(this.room.title) ||
        !Validate.text(this.room.country) ||
        !Validate.text(this.room.city) ||
        !Validate.text(this.room.area) ||
        !Validate.text(this.room.address) ||
        !Validate.text(this.room.description) ||
        !this.room.numBeds ||
        !this.room.pricePerDay) {
      console.log('INPUT ERROR');
      this.invalidInput = true;
      this.success = false;
      return;
    }

    console.log('Gonna save ' + JSON.stringify(this.room));
    this.invalidInput = false;

    this.roomService.put(this.room).subscribe(
      () => {
        this.success = true;
      }
    );
  }

}
