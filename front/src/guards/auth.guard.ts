import {inject, Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private sessionService = inject(SessionService);
  private router = inject(Router);

  public canActivate(): boolean {
    if (!this.sessionService.isLoggedIn()) {
      console.log('AuthGuard: User is not logged in, redirecting to /connexion');
      this.router.navigateByUrl('/connexion');
      return false;
    }
    return true;
  }
}
