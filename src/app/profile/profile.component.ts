import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { Validate } from '../helpers/validate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  fullCurrentUser: any;
  success: boolean;
  invalidInput: boolean;

  constructor(private token: TokenStorageService,
              private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    if (this.currentUser == null) {
      return;
    }

    this.invalidInput = false;
    this.success = false;

    this.userService.getUser(this.currentUser.id).subscribe(
     data => {
        this.fullCurrentUser = data;
      }
    );
  }

  reload(): void {
      window.location.reload();
  }

  save(): void {
      console.log('Printing user: ' +
                    this.fullCurrentUser.name + ' ' +
                    this.fullCurrentUser.surname + ' ' +
                    this.fullCurrentUser.email + ' ' +
                    this.fullCurrentUser.phone);
      if (!Validate.text(this.fullCurrentUser.name) ||
        !Validate.text(this.fullCurrentUser.surname) ||
        !Validate.text(this.fullCurrentUser.email) ||
        !Validate.text(this.fullCurrentUser.phone)) {
      this.invalidInput = true;
      this.success = false;
      return;
    }

      this.invalidInput = false;

      this.userService.updateUser(this.fullCurrentUser).subscribe(() => this.success = true);
  }

}
