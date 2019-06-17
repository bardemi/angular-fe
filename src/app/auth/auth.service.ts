import { CookieService } from './cookie.service'
import { Injectable } from '@angular/core'
import { BasicAuthService } from './basic-auth.service'
import { Subject } from 'rxjs'
import { log } from '../shared'

export const ROLLE_ADMIN = 'admin'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isLoggedInSubject = new Subject<boolean>()
    private rollenSubject = new Subject<Array<string>>()

    constructor(
        private readonly basicAuthService: BasicAuthService,
        private readonly cookieService: CookieService,
    ) {
        console.log('AuthService.constructor()')
    }

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    @log
    async login(username: string | undefined, password: string | undefined) {
        let rollen: Array<string> = []
        try {
            rollen = await this.basicAuthService.login(username, password)
            console.log('AuthService.login()', rollen)
            this.isLoggedInSubject.next(true)
        } catch (e) {
            console.warn('AuthService.login(): Exception', e)
            this.isLoggedInSubject.next(false)
        }
        this.rollenSubject.next(rollen)
    }

    /**
     * @return void
     */
    @log
    logout() {
        this.cookieService.deleteAuthorization()
        this.isLoggedInSubject.next(false)
        this.rollenSubject.next([])
    }

    @log
    subscribeIsLoggedIn(next: (event: boolean) => void) {
        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request abbrechen ("cancel") kann
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        return this.isLoggedInSubject.subscribe(next)
    }

    @log
    subscribeRollen(next: (event: Array<string>) => void) {
        return this.rollenSubject.subscribe(next)
    }

    /**
     * @return String fuer JWT oder Basic-Authentifizierung
     */
    getAuthorization() {
        return this.cookieService.getAuthorization()
    }

    /**
     * @return true, falls ein User eingeloggt ist; sonst false.
     */
    isLoggedIn() {
        return this.cookieService.getAuthorization() !== undefined
    }

    /**
     * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
     *         sonst false.
     */
    isAdmin() {
        // z.B. 'admin,mitarbeiter'
        const rolesStr = this.cookieService.getRoles()
        if (rolesStr === undefined) {
            return false
        }

        // z.B. ['admin', 'mitarbeiter']
        const rolesArray = rolesStr.split(',')
        return rolesArray !== undefined && rolesArray.includes(ROLLE_ADMIN)
    }

    toString() {
        return 'AuthService'
    }
}
