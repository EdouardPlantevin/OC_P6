import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {RegisterRequestInterface} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathUser = '/api/users';
  constructor(private httpClient: HttpClient) { }

  /**
   * Updates the profile of the authenticated user.
   * @param userForm The updated user data
   * @returns Promise that resolves when the profile is updated
   */
  public async updateUser(userForm: RegisterRequestInterface): Promise<void> {
    await firstValueFrom(this.httpClient.put<void>(`${this.pathUser}/update`, userForm));
  }

}
