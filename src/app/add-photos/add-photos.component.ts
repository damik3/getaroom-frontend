import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {Observable} from 'rxjs';
import {UploadPhotosService} from '../services/upload-photos.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit {

  currentUser: any;
  fullCurrentUser: any;
  isOwner = false;
  roomId: number;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  success = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private token: TokenStorageService,
              private router: Router,
              private uploadService: UploadPhotosService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!this.currentUser) {
      this.router.navigate(['/', 'login']);
    }

    this.userService.getUser(this.currentUser.id).subscribe(
      data => {
        this.fullCurrentUser = data;

        this.roomId = +this.route.snapshot.paramMap.get('id');

        for (const room of this.fullCurrentUser.rooms) {
          if (room.id === this.roomId) {
            this.isOwner = true;
          }
        }

        if (this.isOwner === false) {
          this.router.navigate(['/home']);
        }
      }
    );
  }



  selectFile(event) {
    this.selectedFiles = event.target.files;
  }



  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, String(this.roomId)).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.success = true;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
        this.success = false;
      });

    this.selectedFiles = undefined;
  }


}
