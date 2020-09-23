import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: any;
  errorMessage = '';
  approved = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService,
              private userService: UserService) { }

  ngOnInit(): void {

    // Check if admin
    if (!this.token.isAdmin()) {
      this.router.navigate(['/home']);
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id).subscribe(
      data => {
        this.user = data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  public delete(userId): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.router.navigate(['/users'], { queryParams: { justDeleted: 'true' } });
      },
      () => {
        this.errorMessage = 'Error: Something unexpected happened!';
      }
    );
  }

  public approveHostReq(userId): void {
    this.userService.approveHostReq(userId).subscribe(
      () => {
        this.approved = true;
      },
      () => {
        this.errorMessage = 'Error: Something unexpected happened!';
      }
    );
  }

}
