import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from "@angular/common/http";
import {ThemeInterface} from "../interfaces/theme.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly themesResource: HttpResourceRef<ThemeInterface[] | undefined> =
    httpResource<ThemeInterface[]>(() => '/api/themes');

}
