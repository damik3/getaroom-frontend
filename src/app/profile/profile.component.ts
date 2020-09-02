import { Component, OnInit, Input } from '@angular/core';

import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  fullCurrentUser: any;
  errorMessage: any;

  constructor(private token: TokenStorageService,
              private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    if (this.currentUser == null) {
      return;
    }

    this.userService.getUser(this.currentUser.id).subscribe(
     data => {
        this.fullCurrentUser = data;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
      }
    );
  }

  reload(): void {
      window.location.reload();
  }

  save(): void {
      this.userService.updateUser(this.fullCurrentUser).subscribe(() => this.reload());
  }

}
