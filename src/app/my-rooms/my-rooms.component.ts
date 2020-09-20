import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {

  currentUser: any;
  fullCurrentUser: any;
  justAdded = '';

  constructor(private token: TokenStorageService,
              private readonly router: Router,
              private userService: UserService,
              private route: ActivatedRoute) { }

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
    });

    this.userService.getUser(this.currentUser.id).subscribe(
      data => {
        this.fullCurrentUser = data;
        console.log('this.fullcurrentuser = ' + JSON.stringify(this.fullCurrentUser));
      }
    );
  }

}
