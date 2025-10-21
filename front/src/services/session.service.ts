import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _isLoggedIn = signal<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asReadonly();

  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    this.checkExistingSession();
  }

  async logIn(username: string, password: string): Promise<boolean> {
    try {
      // Simulation d'un appel API
      await this.simulateApiCall();
      
      const user: User = {
        id: 1,
        username: username,
        email: username.includes('@') ? username : `${username}@example.com`
      };

      this._currentUser.set(user);
      this._isLoggedIn.set(true);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');

      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  }

  logOut(): void {
    this._currentUser.set(null);
    this._isLoggedIn.set(false);

    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
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


  private simulateApiCall(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}
