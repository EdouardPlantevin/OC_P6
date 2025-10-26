import {inject, Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

  private sessionService = inject(SessionService);
  private router = inject(Router);

  public canActivate(): boolean {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigateByUrl('/articles');
      return false;
    }
    return true;
  }
}
