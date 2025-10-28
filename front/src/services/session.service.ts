import {inject, Injectable, signal} from '@angular/core';
import {SessionInterface} from "../interfaces/session.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private router = inject(Router);

  private _isLoggedIn = signal<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asReadonly();

  private _currentUser = signal<SessionInterface | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    this.checkExistingSession();
  }

  /**
   * Logs in a user and stores session information.
   * @param sessionInformationInterface The session information containing user data and token
   */
  logIn(sessionInformationInterface: SessionInterface): void {
    this._currentUser.set(sessionInformationInterface);
    this._isLoggedIn.set(true);

    localStorage.setItem('user', JSON.stringify(sessionInformationInterface));
    localStorage.setItem('isLoggedIn', 'true');
  }

  /**
   * Logs out the current user and clears session data.
   * Redirects to the login page.
   */
  logOut(): void {
    this._currentUser.set(null);
    this._isLoggedIn.set(false);

    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');

    this.router.navigateByUrl('/connexion');
  }

  /**
   * Checks if there is an existing session in localStorage.
   * Loads user data if found.
   * @private
   */
  private checkExistingSession(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('user');

    if (isLoggedIn && userData) {
      try {
        const user = JSON.parse(userData);
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        this.logOut();
      }
    }
  }
}
