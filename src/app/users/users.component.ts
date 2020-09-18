import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  userDeleted = false;
  err = false;

  constructor(private userService: UserService,
              private token: TokenStorageService,
              private readonly router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (!this.token.isAdmin()) {
      this.router.navigate(['/login']);
    }

    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      }
    );

    this.route.queryParams.subscribe(params => {
      this.userDeleted = params.justDeleted;
    });
  }

  public delete(userId): void {
    console.log('BOOM');

    this.userService.deleteUser(userId).subscribe(
      data => {
        this.userDeleted = true;
        this.err = false;
        delete this.users[userId];
      },
      err => {
        this.userDeleted = false;
        this.err = true;
      }
    );
  }

}
