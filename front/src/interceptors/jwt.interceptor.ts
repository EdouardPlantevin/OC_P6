import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.sessionService.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sessionService.currentUser()!.token}`,
        },
      });
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.sessionService.logOut();
          this.router.navigateByUrl('/connexion');
        }
        return throwError(() => error);
      })
    );
  }
}
