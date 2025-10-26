import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {RegisterRequestInterface} from "../interfaces/register-request.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathUser = '/api/users';
  constructor(private httpClient: HttpClient) { }

  public async updateUser(userForm: RegisterRequestInterface): Promise<void> {
    await firstValueFrom(this.httpClient.put<void>(`${this.pathUser}/update`, userForm));
  }

}
