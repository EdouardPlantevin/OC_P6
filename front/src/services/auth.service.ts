import { Injectable } from '@angular/core';
import {LoginRequestInterface} from "../interfaces/auth.interface";
import {SessionInterface} from "../interfaces/session.interface";
import {RegisterRequestInterface} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathAuth = '/api/auth';

  /**
   * Logs in a user with provided credentials.
   * @param loginRequestInterface User login credentials
   * @returns Promise with session data including JWT token
   * @throws Error if login fails with status code
   */
  public async login(loginRequestInterface: LoginRequestInterface): Promise<SessionInterface> {
    const response = await fetch(`${this.pathAuth}/login`, {
      method: 'POST',
      body: JSON.stringify(loginRequestInterface),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseStatus = response.status;

    if (responseStatus !== 200) {
      const error = new Error('Erreur lors de la connexion');
      (error as any).status = responseStatus;
      throw error;
    }

    const body = await response.json();
    return body as SessionInterface;
  }

  /**
   * Registers a new user in the system.
   * @param registerRequestInterface User registration data
   * @returns Promise that resolves when registration is successful
   * @throws Error if registration fails with status code
   */
  public async register(registerRequestInterface: RegisterRequestInterface): Promise<void> {
    const response = await fetch(`${this.pathAuth}/register`, {
      method: 'POST',
      body: JSON.stringify(registerRequestInterface),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseStatus = response.status;

    if (responseStatus !== 200) {
      const error = new Error('Erreur lors de l\'inscription');
      (error as any).status = responseStatus;
      throw error;
    }
  }
}
