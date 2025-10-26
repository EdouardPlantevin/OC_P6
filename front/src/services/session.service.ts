import {inject, Injectable, signal} from '@angular/core';
import {SessionInformationInterface} from "../interfaces/session-information.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private router = inject(Router);

  private _isLoggedIn = signal<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asReadonly();

  private _currentUser = signal<SessionInformationInterface | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    this.checkExistingSession();
  }

  logIn(sessionInformationInterface: SessionInformationInterface): void {
    this._currentUser.set(sessionInformationInterface);
    this._isLoggedIn.set(true);

    localStorage.setItem('user', JSON.stringify(sessionInformationInterface));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', sessionInformationInterface.token);
  }

  logOut(): void {
    this._currentUser.set(null);
    this._isLoggedIn.set(false);


    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');

    this.router.navigateByUrl('/connexion');
  }

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
