import {Component, computed, inject} from '@angular/core';
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

  async subscribe(id: number) {
    await this.themeService.toggleSubscription(id);
  }
}
