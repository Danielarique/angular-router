import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
    ngOnInit(): void {
       const token = this.tokenService.getToken();
       if(token){
        this.authService.getProfile().subscribe()
       } 
    }
  createUser() {
    this.usersService.create({
      name: 'Sebas',
      email: 'sebas@mail.com',
      password: '1212',
      role: 'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }

  }
}
