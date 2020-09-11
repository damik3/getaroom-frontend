import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {

  currentUser: any;
  fullCurrentUser: any;

  constructor(private token: TokenStorageService,
              private readonly router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!this.currentUser) {
      this.router.navigate(['/', 'login']);
    }
    console.log('this.user = ' + JSON.stringify(this.currentUser));

    this.userService.getUser(this.currentUser.id).subscribe(
      data => {
        this.fullCurrentUser = data;
        console.log('this.fullcurrentuser = ' + JSON.stringify(this.fullCurrentUser));
      }
    );
  }

}
