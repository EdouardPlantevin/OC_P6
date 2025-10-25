import {Component, computed, effect, inject} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {ThemeInterface} from "../../../interfaces/theme.interface";
import {CardThemeComponent} from "../../components/card-theme/card-theme.component";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-theme',
  imports: [
    CardThemeComponent
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {

  private themeService = inject(ThemeService);

  themes = computed(() => this.themeService.themesResource.value());

  constructor() {
    effect(() => {
      console.log("Themes updated: ", this.themes());
    });
  }

  mockThemes: ThemeInterface[] = []

  toggleSubscribe(id: number, action: boolean) {
    console.log("Change theme id " + id + " subscribe to " + action)
  }
}
