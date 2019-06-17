import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {} // eslint-disable-line no-empty-function,no-useless-constructor

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const authorizationStr = `${this.authService.getAuthorization()}`
        console.log(`authorizationStr=${authorizationStr}`)
        const requestWithAuthorization = request.clone({
            setHeaders: { Authorization: authorizationStr },
        })
        return next.handle(requestWithAuthorization)
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
]
