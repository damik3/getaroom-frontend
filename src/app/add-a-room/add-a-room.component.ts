import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Room } from '../room';
import { RoomService } from '../services/room.service';
import { Validate } from '../helpers/validate';
import {Router} from '@angular/router';
import {UploadPhotosService} from '../services/upload-photos.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-a-room',
  templateUrl: './add-a-room.component.html',
  styleUrls: ['./add-a-room.component.css']
})
export class AddARoomComponent implements OnInit {

  currentUser: any;
  isHost: any;
  room: Room;
  success: boolean;
  invalidInput: boolean;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';



  constructor(private token: TokenStorageService,
              private roomService: RoomService,
              private router: Router,
              private uploadPhotosService: UploadPhotosService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (this.currentUser == null) {
      return;
    }

    this.room = new Room();
    this.room.owner.id = this.currentUser.id;
    this.success = false;
    this.invalidInput = false;

    if (this.currentUser) {
      this.isHost = this.currentUser.roles.includes('ROLE_HOST');
    }
  }



  selectFile(event) {
    this.selectedFiles = event.target.files;
  }



  save(): void {

    // Validate that all fields are non empty
    if (!Validate.text(this.room.title) ||
        !Validate.text(this.room.country) ||
        !Validate.text(this.room.city) ||
        !Validate.text(this.room.area) ||
        !Validate.text(this.room.address) ||
        !Validate.text(this.room.description) ||
        !this.room.numBeds ||
        !this.room.pricePerDay ||
        !this.selectedFiles) {
      console.log('INPUT ERROR');
      this.invalidInput = true;
      this.success = false;
      return;
    }

    this.invalidInput = false;



    // Add all room info except the main photo url
    this.roomService.put(this.room).subscribe(
      data => {

        const roomId = data.id;
        this.currentFile = this.selectedFiles.item(0);

        // Upload main photo
        this.uploadPhotosService.upload(this.currentFile, String(roomId)).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.success = true;

              // Get main photo url
              const mainPhotoUrl = event.body.url;

              // Update record of room with main photo url
              this.roomService.addMainPhoto(roomId, mainPhotoUrl).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                  this.message = data.message;
                  this.success = true;

                  // Redirect to my-rooms
                  this.router.navigate(['/my-rooms'], {queryParams: {justAdded: 'true'}});
                },
                error => {
                  this.message = 'Could not update main photo!';
                  this.success = false;
                }
              );
              }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.success = false;
            this.currentFile = undefined;
            console.log('Could not upload photo!');
          });
      },
      () => {
        this.message = 'Could not add room!';
        this.success = false;
        console.log('Could not add room!');
      }
    );
  }

}
