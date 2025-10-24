import { Component, signal, computed } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    @if (showHeader()) {
      <app-header class="header-component" />
    }
    <div class="container">
        <router-outlet />
    </div>
  `
})
export class AppComponent {
  currentUrl = signal<string>('/');
  isMobile = signal<boolean>(window.innerWidth < 768);

  noHeaderRoutes = ['/'];
  desktopOnlyRoutes = ['/', '/connexion', '/inscription'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.currentUrl.set(e.urlAfterRedirects);
      });

    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }

  showHeader = computed(() => {
    const url = this.currentUrl();
    const mobile = this.isMobile();

    if (this.noHeaderRoutes.includes(url)) {
      return false;
    }

    if (this.desktopOnlyRoutes.includes(url)) {
      return !mobile;
    }

    return true;
  });
}
