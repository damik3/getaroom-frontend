import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-host-requests',
  templateUrl: './host-requests.component.html',
  styleUrls: ['./host-requests.component.css']
})
export class HostRequestsComponent implements OnInit {

  users: any = [];
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllHostReq().subscribe(
      data => {
        this.users = data;
      },
      () => {
        this.errorMessage = 'Error: Something unexpected happened!';
      }
    );
  }

}
