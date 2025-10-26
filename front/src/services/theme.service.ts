import { Injectable, inject } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ThemeInterface } from '../interfaces/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private pathAuth = '/api/themes';

  private http = inject(HttpClient);

  readonly themesResource: HttpResourceRef<ThemeInterface[] | undefined> =
    httpResource<ThemeInterface[]>(() => this.pathAuth);

  public getThemesSubscribed(): ThemeInterface[] {
    const themes = this.themesResource.value();
    if (!themes) {
      return [];
    }
    return themes.filter(theme => theme.subscribe);
  }

  public async toggleSubscription(id: number): Promise<void> {
    await firstValueFrom(this.http.post<void>(this.pathAuth, { themeId: Number(id) }));
    this.themesResource.reload();
  }
}
