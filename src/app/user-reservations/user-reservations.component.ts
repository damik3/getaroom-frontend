import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  reservations: any;
  justBooked: string;

  constructor(private reservationService: ReservationService,
              private readonly router: Router,
              private token: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    // If user is not logged in, redirect to login
    if (!this.token.getUser()) {
      this.router.navigate(['/', 'login']);
    }

    this.route.queryParams.subscribe(params => {
      this.justBooked = params.justBooked;
    });

    // Get user's reservations
    this.reservationService.getUserReservations(this.token.getUser().id).subscribe(
      data => {
        this.reservations = data;
      }
    );
  }

}
