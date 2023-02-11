import {  } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { OnExit } from '../../../guards/exit.guard';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  OnExit(){
    const rta = confirm("seguro?");
    return rta;
  }

}
