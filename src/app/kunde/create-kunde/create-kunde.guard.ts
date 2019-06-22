import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { CreateKundeComponent } from './create-kunde.component'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { log } from '../../shared'

@Injectable({ providedIn: 'root' })
export class CreateKundeGuard implements CanDeactivate<CreateKundeComponent> {
    constructor() {
        console.log('CreateKundeGuard.constructor()')
    }

    @log
    canDeactivate(
        createKunde: CreateKundeComponent,
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (createKunde.fertig) {
            // Seite darf zur gewuenschten URL verlassen werden
            return true
        }

        createKunde.showWarning = true
        createKunde.fertig = true
        console.warn('Beim Verlassen der Seite gehen Daten verloren.')
        return false
    }

    toString() {
        return 'CreateKundeGuard'
    }
}
