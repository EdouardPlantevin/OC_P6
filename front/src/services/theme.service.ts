import { Injectable } from '@angular/core';
import {httpResource, HttpResourceRef} from "@angular/common/http";
import {ThemeInterface} from "../interfaces/theme.interface";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly themesResource: HttpResourceRef<ThemeInterface[] | undefined> =
    httpResource<ThemeInterface[]>(() => '/api/themes');

}
