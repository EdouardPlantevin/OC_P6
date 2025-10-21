import {Component, input, output} from '@angular/core';
import {ThemeInterface} from "../../../interfaces/theme.interface";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-card-theme',
  imports: [
    MatButton
  ],
  templateUrl: './card-theme.component.html',
  styleUrl: './card-theme.component.scss'
})
export class CardThemeComponent {
  theme = input.required<ThemeInterface>();
  toggleSubscribe = output<boolean>();


}
