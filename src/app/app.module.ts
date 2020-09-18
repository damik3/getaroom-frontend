import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { AddARoomComponent } from './add-a-room/add-a-room.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { MyRoomsComponent } from './my-rooms/my-rooms.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RoomDetailsComponent,
    AddARoomComponent,
    ReservationComponent,
    UserReservationsComponent,
    MyRoomsComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
