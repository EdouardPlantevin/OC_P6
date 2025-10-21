import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    HeaderComponent,
    MatButton,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  back() {
    window.history.back();
  }

}
