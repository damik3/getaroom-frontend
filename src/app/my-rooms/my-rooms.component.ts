import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {

  currentUser: any;
  fullCurrentUser: any;
  justAdded = '';
  justDeleted = '';
  errorMessage = '';

  constructor(private token: TokenStorageService,
              private readonly router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private roomService: RoomService) { }

  ngOnInit(): void {

    // Check if user is logged in, else redirect to login
    this.currentUser = this.token.getUser();
    if (!this.currentUser) {
      this.router.navigate(['/', 'login']);
    }
    console.log('this.user = ' + JSON.stringify(this.currentUser));

    // Get, if any, request parameters
    this.route.queryParams.subscribe(params => {
      this.justAdded = params.justAdded;
      this.justDeleted = params.justDeleted;
    });

    this.userService.getUser(this.currentUser.id).subscribe(
      data => {
        this.fullCurrentUser = data;
        console.log('this.fullcurrentuser = ' + JSON.stringify(this.fullCurrentUser));
      }
    );
  }



  deleteRoom(room: any): void {
    if (confirm('Are you sure you want to delete this room?')) {
      console.log('gonna delete');

      this.roomService.delete(room.id).subscribe(
        () => {
          this.router.navigate(['/my-rooms'], { queryParams: { justDeleted: 'true' } }).then(() => {
            window.location.reload();
          });
        },
        data => {
          this.errorMessage = data.message;
        }
      );
    }
  }
}
