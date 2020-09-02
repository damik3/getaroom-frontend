import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RoomDetailsComponent} from './room-details/room-details.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'room/:id', component: RoomDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
