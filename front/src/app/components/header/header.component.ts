import {Component, inject, signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CommonModule } from '@angular/common';
import {SessionService} from "../../../services/session.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatIconButton,
    MatSidenavModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  sessionService = inject(SessionService);

  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
