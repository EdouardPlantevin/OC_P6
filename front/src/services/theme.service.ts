import {Injectable, inject, computed} from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ThemeInterface } from '../interfaces/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private pathTheme = '/api/themes';

  private http = inject(HttpClient);

  readonly themesResource: HttpResourceRef<ThemeInterface[] | undefined> =
    httpResource<ThemeInterface[]>(() => this.pathTheme);

  /**
   * Computed property that returns only the themes the user is subscribed to.
   */
  public themesSubscribe = computed(() => {
    const themes = this.themesResource.value()
    return themes?.filter(theme => theme.subscribe);
  });

  /**
   * Toggles the subscription status of a theme.
   * @param id The theme ID to toggle subscription for
   * @returns Promise that resolves when the subscription is toggled
   */
  public async toggleSubscription(id: number): Promise<void> {
    await firstValueFrom(this.http.post<void>(`${this.pathTheme}/toggle-subscription`, { themeId: Number(id) }));
    this.themesResource.reload();
  }
}
