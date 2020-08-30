import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../services/token-storage.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  fullCurrentUser: any;
  errorMessage = null;

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.userService.getUser(this.currentUser.id).subscribe(
     data => {
        this.fullCurrentUser = data;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
      }
    );
  }
}
