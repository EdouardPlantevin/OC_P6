import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {ThemeInterface} from "../../../interfaces/theme.interface";
import {CardThemeComponent} from "../../components/card-theme/card-theme.component";

@Component({
  selector: 'app-theme',
  imports: [
    HeaderComponent,
    CardThemeComponent
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {

  mockThemes: ThemeInterface[] = [
    {
      id: 1,
      title: 'Theme 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: false
    },
    {
      id: 2,
      title: 'Theme 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: false
    },
    {
      id: 3,
      title: 'Theme 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: true
    },
    {
      id: 4,
      title: 'Theme 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: true
    },
    {
      id: 5,
      title: 'Theme 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non erat id nisi consequat eleifend sed vitae augue. Phasellus maximus sit amet neque et sagittis. Integer pharetra non velit ut dignissim. Praesent quis iaculis turpis, nec volutpat tortor. Pellentesque ac tristique dolor, sed maximus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed suscipit dui in tempus posuere.',
      subscribe: true
    }
  ]

  toggleSubscribe(id: number, action: boolean) {
    console.log("Change theme id " + id + " subscribe to " + action)
  }
}
