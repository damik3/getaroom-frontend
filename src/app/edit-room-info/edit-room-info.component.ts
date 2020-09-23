import { Component, OnInit } from '@angular/core';
import {RoomService} from '../services/room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../room';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-edit-room-info',
  templateUrl: './edit-room-info.component.html',
  styleUrls: ['./edit-room-info.component.css']
})
export class EditRoomInfoComponent implements OnInit {

  isSuccessful = false;
  isFailed = false;
  room: Room;
  errorMessage = '';
  id: string;
  currentUser: any;
  fullCurrentUser: any;
  isOwner: boolean;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private token: TokenStorageService,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit(): void {

    // Get room id from activated route
    this.id = this.route.snapshot.paramMap.get('id');

    // Check if user is owner of current room
    this.currentUser = this.token.getUser();
    if (!this.currentUser) {
      this.router.navigate(['/', 'login']);
      return;
    }

    this.userService.getUser(this.currentUser.id).subscribe(
      data => {
        this.fullCurrentUser = data;


        this.isOwner = false;

        for (const room of this.fullCurrentUser.rooms) {
          if (room.id == this.id) {
            this.isOwner = true;
          }
        }

        if (this.isOwner === false) {
          this.router.navigate(['/home']);
          return;
        }

        // Load current room info
        this.roomService.get(this.id).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.room = data;
          },
          error => {
            this.errorMessage = error.message;
          }
        );
      }
    );
  }

  onSubmit(): void {

    this.roomService.update(this.room).subscribe(
      data => {
        this.isFailed = false;
        this.isSuccessful = true;
      },
      error => {
        this.isFailed = true;
        this.isSuccessful = false;
        this.errorMessage = error.message;
      }
    );
  }



}
