import { Injectable } from '@angular/core';
import {LoginRequestInterface} from "../interfaces/login-request.interface";
import {SessionInformationInterface} from "../interfaces/session-information.interface";
import {RegisterRequestInterface} from "../interfaces/register-request.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathAuth = 'http://localhost:8080/api/auth';

  public async login(loginRequestInterface: LoginRequestInterface): Promise<SessionInformationInterface> {
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
    return body as SessionInformationInterface;
  }

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
