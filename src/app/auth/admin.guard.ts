import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { log } from '../shared'

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
        console.log('AdminGuard.constructor()')
    }

    @log
    canActivate(
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.isAdmin()) {
            console.log('AdminGuard.canActivate(): admin')
            return true
        }

        console.warn('Nicht als "admin" eingeloggt')
        // Navigation wird abgebrochen ("cancelled") und zum neuen Pfad umgeleitet
        return this.router.createUrlTree(['/'])
    }

    toString() {
        return 'AdminGuard'
    }
}