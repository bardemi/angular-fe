import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
// import * as moment from 'moment'
import { Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
// import { DiagrammService } from '../../shared/diagramm.service'
import { BASE_URI, KUNDEN_PATH, log } from '../../shared'
import { Kunde, KundeForm, KundeServer } from './kunde'

/**
 * Die Service-Klasse zu Kunde wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class KundeService {
    private baseUriKunden: string

    // Observables = Event-Streaming mit Promises
    private kundenSubject = new Subject<Array<Kunde>>()
    private kundeSubject = new Subject<Kunde>()
    private errorSubject = new Subject<string | number>()

    // tslint:disable-next-line:variable-name
    private _kunde!: Kunde
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
    })
    /* @param diagrammService injizierter DiagrammService
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(
        // private readonly diagrammService: DiagrammService,
        private readonly httpClient: HttpClient,
    ) {
        this.baseUriKunden = `${BASE_URI}/${KUNDEN_PATH}`
        console.log(
            `KundeService.constructor(): baseUriKunde=${this.baseUriKunden}`,
        )
    }

    @log
    subscribeKunden(next: (kunden: Array<Kunde>) => void) {
        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request auch abbrechen ("cancel") kann
        // tslint:disable:max-line-length
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // tslint:enable:max-line-length
        return this.kundenSubject.subscribe(next)
    }

    @log
    subscribeKunde(next: (kunde: Kunde) => void) {
        return this.kundeSubject.subscribe(next)
    }

    @log
    subscribeError(next: (err: string | number) => void) {
        return this.errorSubject.subscribe(next)
    }

    /**
     * Kunden suchen
     * @param suchkriterien Die Suchkriterien
     */
    @log
    find(suchkriterien: KundeForm) {
        const params = this.suchkriterienToHttpParams(suchkriterien)
        const uri = this.baseUriKunden
        console.log(`KundeService.find(): uri=${uri}`)

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error('Client-seitiger oder Netzwerkfehler', err.error)
                this.errorSubject.next(-1)
                return
            }

            const { status } = err
            console.log(
                `BuchService.find(): errorFn(): status=${status}, ` +
                    'Response-Body=',
                err.error,
            )
            this.errorSubject.next(status)
        }

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request abbrechen ("cancel") kann
        // https://angular.io/guide/http
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        this.httpClient
            .get<Array<KundeServer>>(uri, { params })
            .pipe(
                // http://reactivex.io/documentation/operators.html
                map(jsonArray =>
                    jsonArray.map(jsonObjekt => Kunde.fromServer(jsonObjekt)),
                ),
            )
            .subscribe(kunden => this.kundenSubject.next(kunden), errorFn)

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // In Angular gibt es dafuer den Service Jsonp.
    }

    @log
    findById(id: string | undefined) {
        // Gibt es ein gepuffertes Buch mit der gesuchten ID und Versionsnr.?
        if (this._kunde !== undefined && this._kunde._id === id) {
            console.log('BuchService.findById(): Buch gepuffert')
            this.kundeSubject.next(this._kunde)
            return
        }
        if (id === undefined) {
            console.log('BuchService.findById(): Keine Id')
            return
        }

        // Ggf wegen fehlender Versionsnummer (im ETag) nachladen
        const uri = `${this.baseUriKunden}/${id}`

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error(
                    'BuchService.findById(): errorFn(): Client- oder Netzwerkfehler',
                    err.error,
                )
                this.errorSubject.next(-1)
                return
            }

            const { status } = err
            console.log(
                `BuchService.findById(): errorFn(): status=${status}` +
                    `Response-Body=${err.error}`,
            )
            this.errorSubject.next(status)
        }

        console.log('BuchService.findById(): GET-Request')

        let body: KundeServer | null
        this.httpClient
            .get<KundeServer>(uri, { observe: 'response' })
            .pipe(
                filter(response => {
                    console.debug(
                        'BuchService.findById(): filter(): response=',
                        response,
                    )
                    body = response.body
                    return body !== null
                }),
                map(_ => {
                    this._kunde = Kunde.fromServer(body as KundeServer)
                    return this._kunde
                }),
            )
            .subscribe(buch => this.kundeSubject.next(buch), errorFn)
    }

    // @log
    // findByMail(suchkriterien: KundeForm) {
    //     suchkriterien.email = suchkriterien.suchwort
    //     this.find(suchkriterien)
    //     return this.kundenSubject
    // }

    // @log
    // findByNachname(suchkriterien: KundeForm) {
    //     suchkriterien.email = ''
    //     suchkriterien.nachname = suchkriterien.suchwort
    //     this.find(suchkriterien)
    //     return this.kundenSubject
    // }
    /**
     * Einen neuen Kunden anlegen
     * @param neuerKunde Das JSON-Objekt mit dem neuen Kunden
     * @param succesFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */

    @log
    save(
        neuerKunde: Kunde,
        successFn: (location: string | undefined) => void,
        errorFn: (status: number, errors: { [s: string]: any }) => void,
    ) {
        // neuerKunde.geburtsdatum = moment(new Date())

        const errorFnPost = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'KundeService.save() errorFnPost(): Client- oder Netzwerkfehler',
                    err.error.message,
                )
            } else {
                if (errorFn !== undefined) {
                    errorFn(err.status, err.error)
                } else {
                    console.error('errorFnPost', err)
                }
            }
        }

        this.httpClient
            .post(this.baseUriKunden, neuerKunde, {
                headers: this.headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                map(response => {
                    console.debug(
                        'KundeService.save(): map(): response',
                        response,
                    )
                    const { headers } = response
                    let location: string | null | undefined = headers.get(
                        'Location',
                    )
                    if (location === null) {
                        location = undefined
                    }
                    return location
                }),
            )
            .subscribe(location => successFn(location), errorFnPost)
    }

    @log
    remove(
        kunde: Kunde,
        successFn: () => void | undefined,
        errorFn: (status: number) => void,
    ) {
        const uri = `${this.baseUriKunden}/${kunde._id}`

        const errorFnDelete: (err: HttpErrorResponse) => void = err => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                )
            } else {
                if (errorFn !== undefined) {
                    errorFn(err.status)
                } else {
                    console.error('errorPut', err)
                }
            }
        }

        this.httpClient.delete(uri).subscribe(successFn, errorFnDelete)
    }

    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    @log
    private suchkriterienToHttpParams(suchkriterien: KundeForm): HttpParams {
        let httpParams = new HttpParams()

        if (suchkriterien.email !== undefined && suchkriterien.email !== '') {
            httpParams = httpParams.set('email', suchkriterien.email)
        }

        if (
            suchkriterien.nachname !== undefined &&
            suchkriterien.nachname !== ''
        ) {
            httpParams = httpParams.set('nachname', suchkriterien.nachname)
        }

        if (suchkriterien.geschlecht !== undefined) {
            httpParams = httpParams.set('geschlecht', suchkriterien.geschlecht)
        }

        if (suchkriterien.familienstand !== undefined) {
            httpParams = httpParams.set(
                'familienstand',
                suchkriterien.familienstand,
            )
        }

        return httpParams
    }
}
