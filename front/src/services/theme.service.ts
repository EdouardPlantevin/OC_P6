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

  public themesSubscribe = computed(() => {
    const themes = this.themesResource.value()
    return themes?.filter(theme => theme.subscribe);
  });

  public async toggleSubscription(id: number): Promise<void> {
    await firstValueFrom(this.http.post<void>(`${this.pathTheme}/toggle-subscription`, { themeId: Number(id) }));
    this.themesResource.reload();
  }
}
