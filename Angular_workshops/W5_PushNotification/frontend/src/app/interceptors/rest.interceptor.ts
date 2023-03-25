import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, finalize, delay } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers: request.headers.set('Authorization', ''),
      url: `${environment.baseURL}api/${request.url}`,
    });

    if (!request.reportProgress) {
      this.loadingService.indeterminate.next(true);
    }

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                const progress = Math.round((100 * event.loaded) / event.total);
                this.loadingService.determinate.next(progress);
              }
              break;
            case HttpEventType.Response:
              const config: MatSnackBarConfig = {
                duration: 4000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success'],
              };
              switch (event.status) {
                case 200:
                  if (request.method === 'PUT') {
                    this.snackBar.open('Edit Success', undefined, config);
                  }
                  break;
                case 201:
                  this.snackBar.open('Create Success', undefined, config);
                  break;
                case 204:
                  this.snackBar.open('Delete Success', undefined, config);
                  break;
              }
              break;
          }
        },
        error: (error: any) => {
          if (error instanceof HttpErrorResponse) {
            const config: MatSnackBarConfig = {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['snackbar', 'error'],
            };

            if (error.status === 401 || error.status === 403) {
              this.snackBar.open('Unauthorized', undefined, config);
            }

            if (error.status === 404 && error.error.message) {
              this.snackBar.open(error.error.message, undefined, config);
            } else {
              this.snackBar.open(error.message, undefined, config);
            }
          }
        },
        complete: () => {},
      }),
      delay(200),
      finalize(() => {
        this.loadingService.indeterminate.next(false);
      })
    );
  }
}
