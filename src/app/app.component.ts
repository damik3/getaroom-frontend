import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  username: string;
  isHost = false;
  isAdmin = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;

      this.isHost = this.roles.includes('ROLE_HOST');
      this.isAdmin = this.roles.includes('ROLE_ADMIN');
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
