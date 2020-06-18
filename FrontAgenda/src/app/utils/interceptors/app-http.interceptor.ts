
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInteceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('userId') && localStorage.getItem('userId').length > 0) {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('userId')}`
                }
            });
        }
        return next.handle(req);
    }
}
