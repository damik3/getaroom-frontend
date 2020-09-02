import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-add-a-room',
  templateUrl: './add-a-room.component.html',
  styleUrls: ['./add-a-room.component.css']
})
export class AddARoomComponent implements OnInit {

  currentUser: any;
  isHost: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    if (this.currentUser) {
      this.isHost = this.currentUser.roles.includes('ROLE_HOST');
    }
  }

}
